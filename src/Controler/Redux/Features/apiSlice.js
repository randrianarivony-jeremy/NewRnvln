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
          url: "feeds/" + Date.now(),
          credentials: "include",
        };
      },
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
    }),
    fetchMoreContents: builder.mutation({
      query: (dateRange) => {
        return {
          url: "feeds/" + dateRange,
          credentials: "include",
        };
      },
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
    }),

    fetchAll: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        // try {
        //   const result = await Promise.all([
        //     await fetchWithBQ({ url: "interview", credentials: "include" }),
        //     await fetchWithBQ({ url: "publication", credentials: "include" }),
        //   ]);
        //   return { data: [...result[0].data, ...result[1].data] };
        // } catch (error) {
        //   console.log(error);
        //   return { data: error };
        // }
        const result = await fetchWithBQ({
          url: "interview",
          credentials: "include",
        });
        if (result.error) return { error: result.error };
        return { data: result.data };
      },
      transformResponse: (response) => {
        console.log(response.data);
        return postsAdapter.setAll(initialState, response);
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
