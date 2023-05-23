import { createSlice, current } from "@reduxjs/toolkit";

export const threadSlice = createSlice({
  name: "thread",
  initialState: [],
  reducers: {
    getContents: (state, action) => {
      return action.payload;
    },
    addContentFeeds: (state, action) => {
      return [...state, ...action.payload];
    },
    likeDislike: (state, action) => {
      state[0].map((post) => {
        if (post._id === action.payload.postId)
          action.payload.like
            ? (post.likers = [...post.likers, action.payload.id_user])
            : (post.likers = post.likers.filter(
                (liker) => liker !== action.payload.id_user
              ));
        else return post;
      });
    },
    updateComment: (state, action) => {
      state[0].map((post) => {
        if (post._id === action.payload.postId)
          post.comments = action.payload.data;
        else return post;
      });
    },
  },
});

export default threadSlice.reducer;
export const { addContentFeeds, getContents, likeDislike, updateComment } =
  threadSlice.actions;
