import { socket } from "../../App";
import { apiSlice } from "./apiSlice";

export const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotifications: builder.query({
      query: (currentUser) => {
        return {
          url: "notification",
          credentials: "include",
        };
      },
      providesTags: ["Notification"],
      transformResponse: (responseData, error, currentUser) => [
        ...responseData.map((elt) => {
          switch (elt.action) {
            case "like":
              return {
                action: elt.action,
                name: elt.from.name,
                picture: elt.from.picture,
                text: `a aimé votre ${elt.docModel}.`,
                length: elt.on.likers.length,
                url: "/post/" + elt.docModel + "/" + elt.on._id,
              };
            case "comment":
              return {
                action: elt.action,
                name: elt.from.name,
                picture: elt.from.picture,
                length: elt.on.comments.length,
                text: `a commenté votre ${elt.docModel}.`,
                url: "/post/" + elt.docModel + "/" + elt.on._id,
              };
            case "subscribe":
              return {
                action: elt.action,
                text: "vient de s'abonner à vous.",
                name: elt.from.name,
                picture: elt.from.picture,
                length: currentUser.subscribers,
                url: "/profile/" + elt.from._id,
              };
            case "friendRequest":
              return {
                action: elt.action,
                text: "vous a envoyé une invitation.",
                name: elt.from.name,
                picture: elt.from.picture,
                length: currentUser.friendRequest,
                url: "/profile/" + elt.from._id,
              };
            case "friendAccepted":
              return {
                action: elt.action,
                text: "a accepté votre invitation.",
                name: elt.from.name,
                picture: elt.from.picture,
                length: currentUser.friends,
                url: "/profile/" + elt.from._id,
              };
            case "interview":
              return {
                action: elt.action,
                name: elt.from.name,
                picture: elt.from.picture,
                length: elt.on.question.interviews.length,
                text: "a répondu à votre question.",
                url: "/post/" + elt.on._id,
              };

            default:
              break;
          }
        }),
      ],
      async onCacheEntryAdded(
        currentUser,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("new notification", () => {
            dispatch(notificationSlice.util.invalidateTags(["Notification"]));
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.off("new notification");
      },
    }),
  }),
});

export const { useFetchNotificationsQuery } = notificationSlice;
