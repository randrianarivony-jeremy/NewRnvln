import { createEntityAdapter, current } from "@reduxjs/toolkit";
import { socket } from "../../App";
import { apiSlice } from "../apiSlice";

export const chatAdapter = createEntityAdapter({
  selectId: (message) => message._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const conversationAdapter = createEntityAdapter({
  selectId: (conversation) => conversation._id,
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
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
      query: (category) => "conversation/" + category,
      transformResponse: (responseData) => {
        if (responseData.length !== 0)
          return conversationAdapter.setAll(initialState, responseData);
        else return initialState;
      },
      providesTags: (response, err, category) => [
        { type: "Conversation", id: category },
      ],
      async onCacheEntryAdded(
        category,
        { dispatch, cacheDataLoaded, getCacheEntry, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          socket.on(
            "new message",
            ({ category: newMessageCategory, newMessage }) => {
              if (category === newMessageCategory)
                dispatch(
                  chatSlice.util.updateQueryData(
                    "fetchConversations",
                    category,
                    (draft) => {
                      //new conversation
                      if (
                        draft.ids.findIndex(
                          (id) => id === newMessage.conversationId
                        ) === -1
                      )
                        dispatch(
                          chatSlice.util.invalidateTags([
                            { type: "Conversation", id: category },
                          ])
                        );
                      //fetched conversation
                      else {
                        //unseenMessage update
                        const thatConversation =
                          draft.entities[newMessage.conversationId];
                        thatConversation.unseenMessage.push(newMessage._id);
                        conversationAdapter.updateOne(draft, {
                          id: newMessage.conversationId,
                          changes: {
                            lastMessage: newMessage,
                            updatedAt: new Date().toISOString(),
                          },
                        });
                      }
                    }
                  )
                );
              else return;
            }
          );
          socket.on("deleted message", ({ conversationId, messageId }) => {
            const { data } = getCacheEntry();
            if (data.entities[conversationId].lastMessage._id === messageId)
              dispatch(
                chatSlice.util.invalidateTags([
                  { type: "Conversation", id: category },
                ])
              );
            else
              updateCachedData((draft) => {
                const thatConversation = draft.entities[conversationId];
                thatConversation.unseenMessage =
                  thatConversation.unseenMessage.filter(
                    (msgId) => msgId !== messageId
                  );
              });
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),

    fetchMessages: builder.query({
      query: (userId) => "message/" + userId,
      providesTags: (res, err, userId) => [
        { type: "Messages", id: "LIST" },
        { type: "Messages", id: userId },
      ],
      transformResponse: (responseData) => {
        if (responseData !== null)
          return chatAdapter.setAll(initialState, responseData);
        else return initialState;
      },
      async onCacheEntryAdded(
        userId,
        { cacheDataLoaded, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("new message", ({ newMessage }) => {
            updateCachedData((draft) => {
              if (draft === null)
                return chatAdapter.setAll(initialState, [newMessage]);
              chatAdapter.addOne(draft, newMessage);
            });
          });
          socket.on("deleted message", ({ messageId }) => {
            updateCachedData((draft) => {
              chatAdapter.updateOne(draft, {
                id: messageId,
                changes: { content: "deleted", contentType: "deleted" },
              });
              if (
                draft !== null &&
                draft.ids.every(
                  (id) => draft.entities[id].contentType === "deleted"
                )
              )
                dispatch(
                  chatSlice.util.invalidateTags([
                    { type: "Conversation", id: userId },
                    // { type: "Conversation", id: userId },
                  ])
                );
            });
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),

    addMessage: builder.mutation({
      query: ({ _id, ...body }) => ({
        url: "message",
        method: "POST",
        credentials: "include",
        body,
      }),
      async onQueryStarted({ _id, ...body }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            chatSlice.util.updateQueryData(
              "fetchMessages",
              body.recipient,
              (draft) => {
                chatAdapter.updateOne(draft, {
                  id: _id,
                  changes: data.newMessage,
                });
              }
            )
          );

          socket.emit("message sent", data, body.recipient);

          if (body.conversationId === null)
            dispatch(
              chatSlice.util.invalidateTags([
                { type: "Conversation", id: body.recipient },
              ])
            );

          //existing fetchConversations query cached data
          if (body.category)
            //existing conversation
            dispatch(
              chatSlice.util.updateQueryData(
                "fetchConversations",
                body.category,
                (draft) => {
                  //new conversation in case of conversations lazy loaded
                  if (
                    draft.ids.findIndex((id) => id === body.conversationId) ===
                    -1
                  )
                    dispatch(
                      chatSlice.util.invalidateTags([
                        { type: "Conversation", id: body.category },
                      ])
                    );
                  else
                    conversationAdapter.updateOne(draft, {
                      id: body.conversationId,
                      changes: {
                        lastMessage: data.newMessage,
                        updatedAt: data.newMessage.createdAt,
                      },
                    });
                }
              )
            );
          //new conversation
          else
            dispatch(
              chatSlice.util.invalidateTags([
                { type: "Conversation", id: data.category },
              ])
            );
        } catch {
          console.log({ error: "please try again later" });
        }
      },
    }),

    updateNewMessage: builder.mutation({
      query: (category) => ({
        url: "conversation/new/" + category,
        method: "PUT",
      }),
    }),

    checkUnseenMessage: builder.mutation({
      query: ({ conversationId, category }) => ({
        url: "conversation/check/" + conversationId,
        method: "PUT",
      }),
      onQueryStarted: (
        { conversationId, category },
        { dispatch, queryFulfilled }
      ) => {
        const unseenMessagePatch = dispatch(
          chatSlice.util.updateQueryData(
            "fetchConversations",
            category,
            (draft) => {
              const thatConversation = draft.entities[conversationId];
              thatConversation.unseenMessage = [];
            }
          )
        );
        queryFulfilled.catch(unseenMessagePatch.undo);
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
        { userId, messageId, conversationId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
            chatAdapter.updateOne(draft, {
              id: messageId,
              changes: { contentType: "deleted" },
            });
          })
        );

        queryFulfilled.catch(patchResult.undo);
        await queryFulfilled;
        socket.emit("delete message", { userId, messageId, conversationId });
        dispatch(
          chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
            if (
              draft !== null &&
              draft.ids.every(
                (id) => draft.entities[id].contentType === "deleted"
              )
            )
              dispatch(
                chatSlice.util.invalidateTags([
                  { type: "Messages", id: userId },
                  { type: "Conversation", id: userId },
                ])
              );
          })
        );
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
  useUpdateNewMessageMutation,
  useCheckUnseenMessageMutation,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = chatSlice;