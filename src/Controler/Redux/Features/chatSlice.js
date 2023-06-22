import { createEntityAdapter } from "@reduxjs/toolkit";
import { socket } from "../../App";
import { apiSlice } from "../apiSlice";

export const chatAdapter = createEntityAdapter({
  selectId: (messages) => messages._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = chatAdapter.getInitialState();

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchConversation: builder.query({
      query: (userId) => {
        return {
          url: "conversation/" + userId,
          credentials: "include",
        };
      },
      providesTags: (response, err, userId) => [
        { type: "Conversation", id: userId },
      ],
    }),

    fetchConversations: builder.query({
      query: (category) => {
        return {
          url: "conversation/" + category,
          credentials: "include",
        };
      },
      providesTags: (response, err, category) => [
        { type: "Conversation", id: category },
      ],
      async onCacheEntryAdded(
        category,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("new message", () => {
            dispatch(
              chatSlice.util.invalidateTags([
                { type: "Conversation", id: category },
              ])
            );
          });
          socket.on("deleted message", () => {
            dispatch(
              chatSlice.util.invalidateTags([
                { type: "Conversation", id: category },
              ])
            );
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.off("new message");
        socket.off("deleted message");
      },
    }),

    fetchMessages: builder.query({
      query: (userId) => {
        return {
          url: "message/" + userId,
          credentials: "include",
        };
      },
      providesTags: (res, err, userId) => [
        { type: "Messages", id: "LIST" },
        { type: "Messages", id: userId },
      ],
      transformResponse: (responseData) => {
        if (responseData !== null)
          return chatAdapter.setAll(initialState, responseData);
        else return responseData;
      },
      async onCacheEntryAdded(
        userId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData,dispatch }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("new message", ({ newMessage }) => {
            updateCachedData((draft) => {
              chatAdapter.addOne(draft, newMessage);
            });
          });
          socket.on("deleted message", (messageId) => {
            updateCachedData((draft) => {
              chatAdapter.updateOne(draft, {
                id: messageId,
                changes: { content: "deleted", contentType: "deleted" },
              });
              if (
                draft.ids.length === 1 &&
                draft.entities[messageId].contentType === "deleted"
              )
                dispatch(
                  chatSlice.util.invalidateTags([
                    { type: "Messages", id: userId },
                  ])
                );
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.off("new message");
        socket.off("deleted message");
      },
    }),
    addMessage: builder.mutation({
      query: (body) => ({
        url: "message",
        method: "POST",
        credentials: "include",
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          chatSlice.util.updateQueryData(
            "fetchMessages",
            body.recipient,
            (draft) => {
              if (draft === null)
                return chatAdapter.setAll(initialState, [body]);
              chatAdapter.addOne(draft, body);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          socket.emit("message sent", data, body.recipient);
          dispatch(
            chatSlice.util.invalidateTags([
              { type: "Conversation", id: body.recipient },
            ])
          );
          dispatch(
            chatSlice.util.updateQueryData(
              "fetchMessages",
              body.recipient,
              (draft) => {
                chatAdapter.removeOne(draft, body._id);
                chatAdapter.addOne(draft, data.newMessage);
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteMessage: builder.mutation({
      query: ({ messageId, userId, conversationId }) => {
        return {
          url: `message/` + messageId + "/" + conversationId,
          method: "DELETE",
          credentials: "include",
        };
      },
      async onQueryStarted(
        { userId, messageId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
            // chatAdapter.removeOne(draft, messageId);
            chatAdapter.updateOne(draft, {
              id: messageId,
              changes: { contentType: "deleted" },
            });
          })
        );

        queryFulfilled.catch(patchResult.undo);
        await queryFulfilled;
        dispatch(
          chatSlice.util.invalidateTags([{ type: "Conversation", id: userId }])
        );
        socket.emit("delete message", { userId, messageId });
      },
    }),
  }),
});

export const {
  useFetchConversationQuery,
  useFetchConversationsQuery,
  useFetchMainConversationQuery,
  useLazyFetchMainConversationQuery,
  useFetchSecondConversationQuery,
  useLazyFetchSecondConversationQuery,
  useFetchMessagesQuery,
  useFetchMessagesQueryState,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = chatSlice;

// export const {sele}=chatAdapter.getSelectors(state=>state)