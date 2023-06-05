import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => {
        return {
          url: "user/" + userId,
          credentials: "include",
        };
      },
      providesTags: (result) => [{ type: "User", id: result._id }],
    }),
    fetchUserFriends: builder.query({
      query: ({ userId, category }) => {
        return {
          url: "user/" + category + "/" + userId,
          credentials: "include",
        };
      },
      providesTags: (result) => [
        { type: "User", id: "LIST" },
        ...result.map((user) => ({ type: "User", id: user._id })),
      ],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLazyFetchUserFriendsQuery,
  useFetchUserFriendsQuery,
} = userSlice;
