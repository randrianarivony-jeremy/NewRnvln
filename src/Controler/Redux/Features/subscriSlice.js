import { socket } from "../../App";
import { apiSlice } from "../apiSlice";
import { userSlice } from "./userSlice";

export const subscriSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSubscriptions: builder.query({
      query: ({ userId, details }) =>
        "subscri/subscriptions/" + userId + "?details=" + details,
      transformResponse: (response) => {
        if (response === null) return [];
        return response;
      },
      providesTags: (result, err, { userId }) => [
        { type: "Subscriptions", id: userId },
        { type: "Relation", id: userId },
      ],
      // onCacheEntryAdded: async (arg, { cacheDataLoaded, updateCachedData }) => {
      //   await cacheDataLoaded;
      //   socket.on("relation update", ({ category, from }) => {
      //     updateCachedData((draft) => {
      //       if (category === "friend invitation")
      //         draft.friendRequest.push(from);
      //       if (category === "request accepted") draft.friends.push(from);
      //       if (category === "cancel invitation")
      //         draft.friendRequest = draft.friendRequest.filter(
      //           (id) => id !== from
      //         );
      //       if (category === "pull friend")
      //         draft.friends = draft.friends.filter((id) => id !== from);
      //     });
      //   });
      // },
    }),
    fetchSubscribers: builder.query({
      query: ({ userId, details }) =>
        "subscri/subscribers/" + userId + "?details=" + details,
      transformResponse: (response) => {
        if (response === null) return [];
        return response;
      },
      providesTags: (res, err, { userId }) => [
        { type: "Subscribers", id: userId },
        { type: "Relation", id: userId },
      ],
      // onCacheEntryAdded: async ({ userId }, { cacheDataLoaded, dispatch }) => {
      //   await cacheDataLoaded;
      //   socket.on("relation update", ({ category }) => {
      //     console.log(category);
      //     dispatch(
      //       userSlice.util.invalidateTags([{ type: "Relation", id: userId }])
      //     );
      //   });
      // },
    }),

    // S U B S C R I P T I O N
    subscribe: builder.mutation({
      query: ({ myUser, fees, ...body }) => ({
        url: "subscri/subscribe",
        method: "POST",
        body,
      }),
      invalidatesTags: (res, err, { myUser, fees, ...body }) => [
        { type: "Post", id: "LIST" },
        { type: "Subscriptions", id: myUser },
        { type: "Subscribers", id: myUser },
        { type: "Subscriptions", id: body.id_user },
        { type: "Subscribers", id: body.id_user },
        { type: "Conversation", id: "main" },
        { type: "Conversation", id: "second" },
      ],
      onQueryStarted: async (
        { myUser, fees, id_user },
        { queryFulfilled, dispatch }
      ) => {
        const walletPatch = dispatch(
          userSlice.util.updateQueryData("fetchUser", myUser, (draft) => {
            draft.wallet -= fees;
          })
        );
        queryFulfilled.catch(walletPatch.undo);
        await queryFulfilled;
        socket.emit("notification", { to: id_user, category: "relation" });
      },
    }),

    unsubscribe: builder.mutation({
      query: ({ myUser, ...body }) => ({
        url: "subscri/unsubscribe",
        method: "PUT",
        body,
      }),
      invalidatesTags: (res, err, { myUser, ...body }) => [
        { type: "Post", id: "LIST" },
        { type: "Subscriptions", id: myUser },
        { type: "Subscribers", id: myUser },
        { type: "Subscriptions", id: body.id_user },
        { type: "Subscribers", id: body.id_user },
        { type: "Conversation", id: "main" },
        { type: "Conversation", id: "second" },
      ],
    }),
  }),
});

export const {
  useFetchSubscribersQuery,
  useLazyFetchSubscribersQuery,
  useFetchSubscriptionsQuery,
  useLazyFetchSubscriptionsQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = subscriSlice;
