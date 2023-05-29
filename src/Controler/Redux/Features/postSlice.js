import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = postsAdapter.getInitialState();

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchContents: builder.query({
      query: (date) => ({
        url: `feeds/${date}`,
        credentials: "include",
      }),
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    fetchMoreContents: builder.mutation({
      query: (body) => {
        return {
          url: "publication",
          method: "POST",
          credentials: "include",
          body,
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
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
export const {
  useFetchContentsQuery,
  useLazyFetchContentsQuery,
  useFetchMoreContentsMutation,
} = postSlice;

export const selectPostsResult = postSlice.endpoints.fetchContents.select();

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
