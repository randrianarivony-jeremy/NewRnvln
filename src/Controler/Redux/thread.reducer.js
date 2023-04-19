import { createSlice, current } from "@reduxjs/toolkit";

export const threadSlice = createSlice({
  name: "thread",
  initialState: [],
  reducers: {
    addContentFeeds: (state, action) => {
      return [...state, action.payload];
    },
    likeDislike: (state, action) => {
      state[0].map((post) => {
        if (post.content._id === action.payload.postId)
          action.payload.like
            ? (post.content.likers = [
                ...post.content.likers,
                action.payload.id_user,
              ])
            : post.content.likers = post.content.likers.filter(
                (liker) => liker !== action.payload.id_user
              );
        else return post;
      });
    },
    updateComment:(state,action)=>{
        state[0].map((post) => {
            if (post.content._id === action.payload.postId)
              post.content.comments = action.payload.data
            else return post;
          });
    }
  },
});

export default threadSlice.reducer;
export const {addContentFeeds,likeDislike,updateComment} = threadSlice.actions;
