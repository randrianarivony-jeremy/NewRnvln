import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = postsAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api/",
  }),
  endpoints: (builder) => ({
    fetchContents: builder.query({
      query: () => {
        return {
          url: "feeds",
          credentials: "include",
        };
      },
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      // async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
      //   const publications = await dispatch(
      //     apiSlice.endpoints.fetchPublications.initiate()
      //   );
      //   console.log(publications);
      // },
    }),
    fetchPublications: builder.query({
      query: () => {
        return {
          url: "publication",
          credentials: "include",
        };
      },
    }),
    fetchInterviews: builder.query({
      query: () => {
        return {
          url: "interview",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useFetchContentsQuery } = apiSlice;

export const selectPostsResult = apiSlice.endpoints.fetchContents.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
