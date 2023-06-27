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

    // F R I E N D S H I P
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

    // S U B S C R I P T I O N
    subscribe: builder.mutation({
      query: (body) => ({
        url: "user/subscribe",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    unsubscribe: builder.mutation({
      query: (body) => ({
        url: "user/unsubscribe",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    // U P D A T E
    changeName: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/username/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (
        { userId, ...body },
        { dispatch, queryFulfilled }
      ) => {
        await queryFulfilled;
        dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.name = body.name;
          })
        );
      },
    }),
    changeEmail: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/email/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (
        { userId, ...body },
        { dispatch, queryFulfilled }
      ) => {
        await queryFulfilled;
        dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.email = body.email;
          })
        );
      },
    }),
    changeAddress: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/address/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const addressPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.address = body.address;
          })
        );
        queryFulfilled.catch(addressPatch.undo);
      },
    }),
    changeJob: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/job/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const jobPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.job = body.job;
          })
        );
        queryFulfilled.catch(jobPatch.undo);
      },
    }),
    changePhilo: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/philosophy/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const philoPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.philosophy = body.philosophy;
          })
        );
        queryFulfilled.catch(philoPatch.undo);
      },
    }),
    changeProject: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/project/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const projectPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.project = body.project;
          })
        );
        queryFulfilled.catch(projectPatch.undo);
      },
    }),
    changeProfilePic: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/profilepicture/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const pdpPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.picture = body.picture;
          })
        );
        queryFulfilled.catch(pdpPatch.undo);
      },
    }),
    changePassword: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/password/" + userId,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLazyFetchUserFriendsQuery,
  useFetchUserFriendsQuery,

  useSubscribeMutation,
  useUnsubscribeMutation,

  useAddFriendMutation,
  usePullFriendMutation,
  useConfirmFriendRequestMutation,
  useCancelFriendInvitationMutation,

  useChangeNameMutation,
  useChangeEmailMutation,
  useChangeAddressMutation,
  useChangeJobMutation,
  useChangePhiloMutation,
  useChangeProjectMutation,
  useChangeProfilePicMutation,
  useChangePasswordMutation,
} = userSlice;
