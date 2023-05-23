import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
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
    fetchContents: builder.query({
      query: () => {
        return {
          url: "/interview",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useFetchContentsQuery } = apiSlice;
