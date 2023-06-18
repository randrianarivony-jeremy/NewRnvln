import { socket } from "../../App";
import { apiSlice } from "./apiSlice";
import {
  logOut,
  setCredentials,
  setNewMainMessage,
  setNewNotification,
  setNewSecondMessage,
} from "./credentialSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiate: builder.mutation({
      query: () => "check_user",
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data !== null) {
            //refresh token present
            dispatch(setNewMainMessage(data.newMainMessage));
            dispatch(setNewSecondMessage(data.newSecondMessage));
            dispatch(setNewNotification(data.newNotification));
            socket.emit("start", data.user._id);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => "auth/logout",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useInitiateMutation,
  useLoginMutation,
  useSignUpMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authSlice;
