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
      query: () => ({
        url: `feeds`,
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
      query: (lastPostCreatedAt) => ({
        url: "feeds/" + lastPostCreatedAt,
        method: "PATCH",
        credentials: "include",
      }),
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.ids.length > 0)
            dispatch(
              postSlice.util.updateQueryData(
                "fetchContents",
                undefined,
                (draft) => {
                  draft.entities = { ...draft.entities, ...data.entities };
                  draft.ids = [...draft.ids, ...data.ids];
                }
              )
            );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    likePost: builder.mutation({
      query: ({ type, postId, body }) => ({
        url: `${type}/like/` + postId,
        method: "PATCH",
        credentials: "include",
        body,
      }),
      async onQueryStarted(
        { type, postId, body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postSlice.util.updateQueryData(
            "fetchContents",
            undefined,
            (draft) => {
              const post = draft.entities[postId];
              if (post)
                body.like
                  ? (post.likers = [...post.likers, body.id_user])
                  : (post.likers = post.likers.filter(
                      (liker) => liker !== body.id_user
                    ));
              else return post;
            }
          )
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

const selectPostsData = createSelector(
  postSlice.endpoints.fetchContents.select(),
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
