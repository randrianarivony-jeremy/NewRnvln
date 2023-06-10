import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { socket } from "../../App";
import { apiSlice } from "./apiSlice";

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
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.off("new message");
      },
    }),
    fetchMessages: builder.query({
      query: (userId) => {
        return {
          url: "message/" + userId,
          credentials: "include",
        };
      },
      transformResponse: (responseData) =>
        chatAdapter.setAll(initialState, responseData),
      async onCacheEntryAdded(
        userId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("new message", ({ newMessage }) => {
            updateCachedData((draft) => {
              chatAdapter.addOne(draft, newMessage);
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.off("new message");
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
              chatAdapter.addOne(draft, body);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          socket.emit("message sent", data, body.recipient);
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
} = chatSlice;

export const selectMessagesData = createSelector(
  (state, userId) => chatSlice.endpoints.fetchMessages.select(userId)(state),
  (conversationMessages) => conversationMessages.data
);

export const getSelectors = (userId) => {
  const selectMessages = chatSlice.endpoints.fetchMessages.select(userId);

  const chatSelectors = createSelector(selectMessages, (result) =>
    chatAdapter.getSelectors(() => result?.data ?? initialState)
  );

  return {
    selectById: (id) =>
      createSelector(chatSelectors, (s) => s.selectById(s, id)),
  };
};

export const {
  selectAll: selectAllMessages,
  selectById: selectMessagesById,
  selectIds: selectMessagesIds,
} = chatAdapter.getSelectors(
  (state, userId) => selectMessagesData(state, userId) ?? initialState
);
