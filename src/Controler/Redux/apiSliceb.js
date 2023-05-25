import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSliceb = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api/",
  }),
  endpoints: (builder) => ({
    fetchPublications: builder.query({
      query: () => {
        return {
          url: "/publication",
          credentials: "include",
        };
      },
    }),
    fetchInterviews: builder.query({
      query: () => {
        return {
          url: "/interview",
          credentials: "include",
        };
      },
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        const publications = await dispatch(
          apiSlice.endpoints.fetchPublications.initiate()
        );
        console.log(publications);
      },
    }),
    fetchContents: builder.query({
      query: () => {
        return {
          url: "/",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useFetchContentsQuery } = apiSliceb;
