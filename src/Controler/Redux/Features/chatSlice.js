import { apiSlice } from "./apiSlice";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMainConversation: builder.query({
      query: () => {
        return {
          url: "conversation/main",
          credentials: "include",
        };
      },
    }),
    fetchSecondConversation: builder.query({
      query: () => {
        return {
          url: "conversation/second",
          credentials: "include",
        };
      },
    }),
    fetchMessages: builder.query({
      query: (userId) => {
        return {
          url: "message/" + userId,
          credentials: "include",
        };
      },
    }),

    addMessage: builder.mutation({
      query: (body) => ({
        url: "message",
        method: "POST",
        credentials: "include",
        body,
      }),
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          chatSlice.util.updateQueryData(
            "fetchMessages",
            body.recipient,
            (draft) => [...draft, body]
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useFetchMainConversationQuery,
  useLazyFetchMainConversationQuery,
  useFetchSecondConversationQuery,
  useLazyFetchSecondConversationQuery,
  useFetchMessagesQuery,
  useAddMessageMutation,
} = chatSlice;
