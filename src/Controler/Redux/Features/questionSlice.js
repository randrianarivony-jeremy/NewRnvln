import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

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
      query: (questionId) => {
        return {
          url: "interview/question/" + questionId,
          credentials: "include",
        };
      },
      providesTags: (response, err, arg) => [{ type: "Question", id: arg }],
      transformResponse: (responseData) =>
        interviewsAdapter.setAll(initialState, responseData),
    }),
  }),
});

export const { useFetchQuestionQuery, useFetchQuestionInterviewsQuery } =
  questionSlice;
