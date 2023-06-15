import { apiSlice } from "./apiSlice";

export const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuestion: builder.query({
      query: (questionId) => {
        return {
          url: "question/" + questionId,
          credentials: "include",
        };
      },
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
    }),
  }),
});

export const { useFetchQuestionQuery, useFetchQuestionInterviewsQuery } =
  questionSlice;
