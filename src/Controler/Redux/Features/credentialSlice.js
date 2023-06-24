import { createSlice } from "@reduxjs/toolkit";

const credentialSlice = createSlice({
  name: "credential",
  initialState: {
    token: null,
    newMainMessage: 0,
    newSecondMessage: 0,
    newNotification: 0,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
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
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setNewMainMessage,
  setNewSecondMessage,
  setNewNotification,
} = credentialSlice.actions;

export default credentialSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
