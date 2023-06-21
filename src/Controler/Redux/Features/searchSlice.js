import { apiSlice } from "../apiSlice";

export const searchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ type, query }) => type + "/search?query=" + query,
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useSearchQuery, useLazySearchQuery } = searchSlice;
