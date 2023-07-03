import { socket } from "../../App";
import { apiSlice } from "../apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => "user/" + userId,
      providesTags: (result) => [{ type: "User", id: result._id }],
      onCacheEntryAdded: async (arg, { cacheDataLoaded, updateCachedData }) => {
        await cacheDataLoaded;
        socket.on("relation update", ({ category, from }) => {
          updateCachedData((draft) => {
            if (category === "friend invitation")
              draft.friendRequest.push(from);
            if (category === "request accepted") draft.friends.push(from);
            if (category === "cancel invitation")
              draft.friendRequest = draft.friendRequest.filter(
                (id) => id !== from
              );
            if (category === "pull friend")
              draft.friends = draft.friends.filter((id) => id !== from);
          });
        });
      },
    }),
    fetchUserFriends: builder.query({
      query: ({ userId, category }) => "user/" + category + "/" + userId,
      providesTags: (res, err, { category, userId }) => [
        { type: category, id: userId },
        { type: "Relation", id: userId },
      ],
      onCacheEntryAdded: async ({ userId }, { cacheDataLoaded, dispatch }) => {
        await cacheDataLoaded;
        socket.on("relation update", ({ category }) => {
          console.log(category);
          dispatch(
            userSlice.util.invalidateTags([{ type: "Relation", id: userId }])
          );
        });
      },
    }),

    // F R I E N D S H I P
    addFriend: builder.mutation({
      query: (body) => ({
        url: "user/friend_invitation",
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (body, { queryFulfilled }) => {
        await queryFulfilled;
        socket.emit("relation change", {
          body,
          category: "friend invitation",
        });
      },
    }),
    pullFriend: builder.mutation({
      query: (body) => ({
        url: "user/pull_friend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, body) => [{ type: "friends", id: body.to }],
      onQueryStarted: async (body, { queryFulfilled }) => {
        await queryFulfilled;
        socket.emit("relation change", {
          body,
          category: "pull friend",
        });
      },
    }),
    confirmFriendRequest: builder.mutation({
      query: (body) => ({
        url: "user/accept_friend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, body) => [
        { type: "friends", id: body.from },
        { type: "requests", id: body.from },
      ],
      onQueryStarted: async (body, { queryFulfilled }) => {
        await queryFulfilled;
        socket.emit("relation change", {
          body,
          category: "request accepted",
        });
      },
    }),
    cancelFriendInvitation: builder.mutation({
      query: (body) => ({
        url: "user/cancel_invitation",
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (body, { queryFulfilled }) => {
        await queryFulfilled;
        socket.emit("relation change", {
          body,
          category: "cancel invitation",
        });
      },
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
    changeFees: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: "user/fees/" + userId,
        method: "PUT",
        body,
      }),
      onQueryStarted: ({ userId, ...body }, { dispatch, queryFulfilled }) => {
        const feesPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", userId, (draft) => {
            draft.fees = body.fees;
          })
        );
        queryFulfilled.catch(feesPatch.undo);
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

  useAddFriendMutation,
  usePullFriendMutation,
  useConfirmFriendRequestMutation,
  useCancelFriendInvitationMutation,

  useChangeNameMutation,
  useChangeEmailMutation,
  useChangeAddressMutation,
  useChangeJobMutation,
  useChangePhiloMutation,
  useChangeFeesMutation,
  useChangeProjectMutation,
  useChangeProfilePicMutation,
  useChangePasswordMutation,
} = userSlice;
