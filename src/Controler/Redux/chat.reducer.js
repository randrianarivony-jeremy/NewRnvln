import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    selectRecipient: (state, action) => {
      return action.payload;
    },
  },
});

export default chatSlice.reducer;
export const {selectRecipient} = chatSlice.actions;
