import { socket } from "../../App";
import { apiSlice } from "../apiSlice";

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
      query: ({ myUser, ...body }) => ({
        url: "subscri/subscribe",
        method: "POST",
        body,
      }),
      invalidatesTags: (res, err, { myUser, ...body }) => [
        { type: "Post", id: "LIST" },
        { type: "Subscriptions", id: myUser },
        { type: "Subscribers", id: myUser },
        { type: "Subscriptions", id: body.id_user },
        { type: "Subscribers", id: body.id_user },
      ],
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
