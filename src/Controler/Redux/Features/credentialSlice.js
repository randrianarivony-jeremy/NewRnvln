import { createSlice } from "@reduxjs/toolkit";

const credentialSlice = createSlice({
  name: "credential",
  initialState: {
    token: null,
    newMainMessage: 0,
    newSecondMessage: 0,
    newNotification: 0,
    newFriendAccepted: 0,
    newFriendRequest: 0,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
    setNewMainMessage: (state, action) => {
      state.newMainMessage = action.payload;
    },
    setNewSecondMessage: (state, action) => {
      state.newSecondMessage = action.payload;
    },
    setNewNotification: (state, action) => {
      state.newNotification = action.payload;
    },
    setNewFriendRequest: (state, action) => {
      state.newFriendRequest = action.payload;
    },
    setNewFriendAccepted: (state, action) => {
      state.newFriendAccepted = action.payload;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setNewMainMessage,
  setNewSecondMessage,
  setNewNotification,
  setNewFriendRequest,
  setNewFriendAccepted,
} = credentialSlice.actions;

export default credentialSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
