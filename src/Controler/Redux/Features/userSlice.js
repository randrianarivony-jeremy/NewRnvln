import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api/user",
  }),
  endpoints: (builder) => ({
    fetchContents: builder.query({
      query: () => {
        return {
          url: "/" + Date.now() + "/" + Date.now(),
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useFetchContentsQuery } = apiSlice;
