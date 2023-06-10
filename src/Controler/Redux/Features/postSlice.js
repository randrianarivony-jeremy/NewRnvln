import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { socket } from "../../App";
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.length > 0)
            dispatch(
              postSlice.util.updateQueryData(
                "fetchContents",
                undefined,
                (draft) => {
                  postsAdapter.addMany(draft, data);
                }
              )
            );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    fetchUserArticles: builder.query({
      query: (userId) => ({
        url: `publication/user/${userId}`,
        credentials: "include",
      }),
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    fetchUserInterviews: builder.query({
      query: (userId) => ({
        url: `interview/user/${userId}`,
        credentials: "include",
      }),
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    likePost: builder.mutation({
      query: ({ type, postId, body, postCreator }) => ({
        url: `${type}/like/` + postId,
        method: "PATCH",
        credentials: "include",
        body,
      }),
      async onQueryStarted(
        { postId, body, postCreator },
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
          if (body.like && postCreator !== body.id_user)
            socket.emit("notification", postCreator);
        } catch {
          patchResult.undo();
        }
      },
    }),
    fetchComments: builder.mutation({
      query: ({ postId, type }) => ({
        url: `${type}/comments/` + postId,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.length > 0)
            dispatch(
              postSlice.util.updateQueryData(
                "fetchContents",
                undefined,
                (draft) => {
                  draft.entities[postId].comments = data;
                }
              )
            );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    commentPost: builder.mutation({
      query: ({ postId, type, text, commenterId, postCreator }) => ({
        url: `${type}/comment/` + postId,
        method: "PATCH",
        credentials: "include",
        body: { text, commenterId: commenterId._id },
      }),
      async onQueryStarted(
        { postId, text, commenterId, postCreator },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postSlice.util.updateQueryData(
            "fetchContents",
            undefined,
            (draft) => {
              const post = draft.entities[postId];
              if (post)
                post.comments = [...post.comments, { commenterId, text }];
              else return post;
            }
          )
        );
        try {
          await queryFulfilled;
          if (postCreator !== commenterId._id)
            socket.emit("notification", postCreator);
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
export const {
  useFetchContentsQuery,
  useFetchMoreContentsMutation,
  useLikePostMutation,
  useFetchCommentsMutation,
  useCommentPostMutation,
  useFetchUserInterviewsQuery,
  useFetchUserArticlesQuery,
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