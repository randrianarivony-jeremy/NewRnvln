import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

export const interviewsAdapter = createEntityAdapter({
  selectId: (interview) => interview._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = interviewsAdapter.getInitialState();

export const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuestion: builder.query({
      query: (questionId) => "question/" + questionId,
      providesTags: (response, err, arg) => [{ type: "Question", id: arg }],
    }),
    fetchQuestionInterviews: builder.query({
      query: (questionId) => "interview/question/" + questionId,
      providesTags: (response, err, arg) => [{ type: "Question", id: arg }],
      transformResponse: (responseData) =>
        interviewsAdapter.setAll(initialState, responseData),
    }),
    addQuestion: builder.mutation({
      query: (body) => ({
        url: "question",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchQuestionQuery,
  useFetchQuestionInterviewsQuery,
  useAddQuestionMutation,
} = questionSlice;
