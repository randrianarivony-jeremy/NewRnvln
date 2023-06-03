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
    likePost: builder.mutation({
      query: ({ type, postId, body, date }) => ({
        url: `${type}/like/` + postId,
        method: "PATCH",
        credentials: "include",
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body,
      }),
      async onQueryStarted(
        { type, postId, body, date },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          postSlice.util.updateQueryData("fetchContents", date, (draft) => {
            console.log(draft);
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.entities[postId];
            if (post)
              body.like
                ? (post.likers = [...post.likers, body.id_user])
                : (post.likers = post.likers.filter(
                    (liker) => liker !== body.id_user
                  ));
            else return post;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
  useLikePostMutation,
} = postSlice;

// Creates memoized selector
const selectPostsData = createSelector(
  (state, date) => postSlice.endpoints.fetchContents.select(date)(state),
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state, date) => selectPostsData(state, date) ?? initialState
);
