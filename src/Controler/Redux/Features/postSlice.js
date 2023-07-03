import { createEntityAdapter } from "@reduxjs/toolkit";
import { socket } from "../../App";
import { apiSlice } from "../apiSlice";
import { questionSlice } from "./questionSlice";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = postsAdapter.getInitialState();

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSinglePost: builder.query({
      query: ({ type, postId }) => ({
        url: `${type}/` + postId,
      }),
      transformErrorResponse: (responseData, err) => err.response.statusText,
      providesTags: (result, err) => {
        if (err) return [{ type: "Post", id: "Error" }];
        if (result) return [{ type: "Post", id: result._id }];
      },
    }),

    fetchContents: builder.query({
      query: () => "feeds",
      transformResponse: (responseData) => {
        responseData = responseData.map((elt) => {
          if (elt.type === "publication" || elt.type === "interview")
            return elt;
          else return { ...elt, type: "question" };
        });
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    fetchMoreContents: builder.mutation({
      query: (lastPostCreatedAt) => "feeds/" + lastPostCreatedAt,
      transformResponse: (responseData) => {
        if (responseData !== null) {
          responseData = responseData.map((elt) => {
            if (elt.type === "publication" || elt.type === "interview")
              return elt;
            else return { ...elt, type: "question" };
          });
        }
        return responseData;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data !== null && data.length > 0)
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

    createPost: builder.mutation({
      query: ({ category, body }) => ({
        url: category,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    fetchUserArticles: builder.query({
      query: (userId) => `publication/user/${userId}`,
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    fetchUserInterviews: builder.query({
      query: (userId) => `interview/user/${userId}`,
      transformResponse: (responseData) =>
        postsAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    likePost: builder.mutation({
      query: ({ type, postId, body, postCreator, question }) => ({
        url: `${type}/like/` + postId,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(
        { postId, body, postCreator, type, question },
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
        const singlePostPatch = dispatch(
          postSlice.util.updateQueryData(
            "fetchSinglePost",
            { type, postId },
            (draft) => {
              body.like
                ? (draft.likers = [...draft.likers, body.id_user])
                : (draft.likers = draft.likers.filter(
                    (liker) => liker !== body.id_user
                  ));
            }
          )
        );
        let interviewsPatch;
        if (type === "interview") {
          interviewsPatch = dispatch(
            questionSlice.util.updateQueryData(
              "fetchQuestionInterviews",
              question,
              (draft) => {
                const post = draft.entities[postId];
                if (post)
                  body.like
                    ? (post.likers = [...post.likers, body.id_user])
                    : (post.likers = post.likers.filter(
                        (liker) => liker !== body.id_user
                      ));
              }
            )
          );
        }
        try {
          await queryFulfilled;
          if (body.like && postCreator !== body.id_user)
            socket.emit("notification", {to:postCreator,category:'reaction'});
        } catch {
          patchResult.undo();
          singlePostPatch.undo();
          if (type === "interview") interviewsPatch.undo();
        }
      },
    }),

    fetchComments: builder.query({
      query: ({ postId, type, question }) => `${type}/comments/` + postId,
      async onQueryStarted(
        { postId, type, question },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          if (data.length > 0) {
            dispatch(
              postSlice.util.updateQueryData(
                "fetchContents",
                undefined,
                (draft) => {
                  draft.entities[postId].comments = data;
                }
              )
            );
            dispatch(
              postSlice.util.updateQueryData(
                "fetchSinglePost",
                { type, postId },
                (draft) => {
                  draft.comments = data;
                }
              )
            );
            if (type === "interview")
              dispatch(
                postSlice.util.updateQueryData(
                  "fetchQuestionInterviews",
                  question,
                  (draft) => {
                    draft.entities[postId].comments = data;
                  }
                )
              );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    commentPost: builder.mutation({
      query: ({ postId, type, text, commenterId, postCreator, question }) => ({
        url: `${type}/comment/` + postId,
        method: "PATCH",
        body: { text, commenterId: commenterId._id },
      }),
      async onQueryStarted(
        { postId, text, commenterId, postCreator, type, question },
        { dispatch, queryFulfilled }
      ) {
        const newsfeedPatch = dispatch(
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
        const singlePostPatch = dispatch(
          postSlice.util.updateQueryData(
            "fetchSinglePost",
            { type, postId },
            (draft) => {
              draft.comments = [...draft.comments, { commenterId, text }];
            }
          )
        );
        let interviewsPatch;
        if (type === "interview") {
          interviewsPatch = dispatch(
            postSlice.util.updateQueryData(
              "fetchQuestionInterviews",
              question,
              (draft) => {
                const post = draft.entities[postId];
                if (post)
                  post.comments = [...post.comments, { commenterId, text }];
                else return post;
              }
            )
          );
        }
        try {
          const { data } = await queryFulfilled;
          if (postCreator !== commenterId._id)
            socket.emit("notification", {to:postCreator,category:"reaction"});

          dispatch(
            postSlice.util.updateQueryData(
              "fetchContents",
              undefined,
              (draft) => {
                const post = draft.entities[postId];
                if (post) post.comments = data;
              }
            )
          );
          dispatch(
            postSlice.util.updateQueryData(
              "fetchSinglePost",
              { type, postId },
              (draft) => {
                draft.comments = data;
              }
            )
          );

          if (type === "interview") {
            dispatch(
              postSlice.util.updateQueryData(
                "fetchQuestionInterviews",
                question,
                (draft) => {
                  const post = draft.entities[postId];
                  if (post) post.comments = data;
                }
              )
            );
          }
        } catch {
          newsfeedPatch.undo();
          singlePostPatch.undo();
          if (type === "interview") interviewsPatch.undo();
        }
      },
    }),

    deleteComment: builder.mutation({
      query: ({ type, postId, commentId, question }) => {
        return {
          url: `${type}/` + postId + "/" + commentId,
          method: "DELETE",
        };
      },
      async onQueryStarted(
        { commentId, postId, type, question },
        { dispatch, queryFulfilled }
      ) {
        const newsfeedUpdate = dispatch(
          postSlice.util.updateQueryData(
            "fetchContents",
            undefined,
            (draft) => {
              const post = draft.entities[postId];
              if (post)
                post.comments = post.comments.filter(
                  (comment) => comment._id !== commentId
                );
            }
          )
        );
        const singlePostUpdate = dispatch(
          postSlice.util.updateQueryData(
            "fetchSinglePost",
            { type, postId },
            (draft) => {
              draft.comments = draft.comments.filter(
                (comment) => comment._id !== commentId
              );
            }
          )
        );
        let interviewsUpdate;
        if (type === "interview") {
          interviewsUpdate = dispatch(
            postSlice.util.updateQueryData(
              "fetchQuestionInterviews",
              question,
              (draft) => {
                const post = draft.entities[postId];
                if (post)
                  post.comments = post.comments.filter(
                    (comment) => comment._id !== commentId
                  );
              }
            )
          );
        }
        try {
          await queryFulfilled;
        } catch (error) {
          newsfeedUpdate.undo();
          singlePostUpdate.undo();
          if (type === "interview") interviewsUpdate.undo();
        }
      },
    }),
  }),
});
export const {
  useFetchSinglePostQuery,
  useFetchContentsQuery,
  useFetchUserInterviewsQuery,
  useFetchUserArticlesQuery,
  useCreatePostMutation,
  useFetchMoreContentsMutation,
  useLikePostMutation,
  useLazyFetchCommentsQuery,
  useCommentPostMutation,
  useDeleteCommentMutation,
} = postSlice;
