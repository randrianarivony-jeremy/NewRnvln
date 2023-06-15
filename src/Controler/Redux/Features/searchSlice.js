import { apiSlice } from "./apiSlice";

export const searchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ type, query }) => {
        return {
          url: type + "/search?query=" + query,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useSearchQuery, useLazySearchQuery } = searchSlice;
