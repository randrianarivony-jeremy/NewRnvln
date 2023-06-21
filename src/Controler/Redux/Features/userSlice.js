import { apiSlice } from "../apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => "user/" + userId,
      providesTags: (result) => [{ type: "User", id: result._id }],
    }),
    fetchUserFriends: builder.query({
      query: ({ userId, category }) => "user/" + category + "/" + userId,
      providesTags: (res, err, { category, userId }) => [
        { type: category, id: userId },
      ],
    }),
    addFriend: builder.mutation({
      query: (body) => ({
        url: "user/friend_invitation",
        method: "PATCH",
        body,
      }),
    }),
    pullFriend: builder.mutation({
      query: (body) => ({
        url: "user/pull_friend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, body) => [{ type: "friends", id: body.to }],
    }),
    confirmFriendRequest: builder.mutation({
      query: (body) => ({
        url: "user/accept_friend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, body) => [{ type: "friends", id: body.from }],
    }),
    cancelFriendInvitation: builder.mutation({
      query: (body) => ({
        url: "user/cancel_invitation",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLazyFetchUserFriendsQuery,
  useFetchUserFriendsQuery,
  useAddFriendMutation,
  usePullFriendMutation,
  useConfirmFriendRequestMutation,
  useCancelFriendInvitationMutation,
} = userSlice;
