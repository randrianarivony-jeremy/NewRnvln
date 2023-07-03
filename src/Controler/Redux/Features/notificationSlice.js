import { socket } from "../../App";
import { apiSlice } from "../apiSlice";

export const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotifications: builder.query({
      query: () => "notification",
      providesTags: ["Notification"],
      transformResponse: (responseData, error) => [
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
                time:elt.updatedAt
              };
            case "comment":
              return {
                action: elt.action,
                name: elt.from.name,
                picture: elt.from.picture,
                length: elt.on.comments.length,
                text: `a commenté votre ${elt.docModel}.`,
                url: "/post/" + elt.docModel + "/" + elt.on._id,
                time:elt.updatedAt
              };
            case "subscribe":
              return {
                action: elt.action,
                text: "vient de s'abonner à vous.",
                name: elt.from.name,
                picture: elt.from.picture,
                url: "/profile/" + elt.from._id,
                time:elt.updatedAt
              };
            case "friendRequest":
              return {
                action: elt.action,
                text: "vous a envoyé une invitation.",
                name: elt.from.name,
                picture: elt.from.picture,
                url: "/profile/" + elt.from._id,
                time:elt.updatedAt
              };
            case "friendAccepted":
              return {
                action: elt.action,
                text: "a accepté votre invitation.",
                name: elt.from.name,
                picture: elt.from.picture,
                url: "/profile/" + elt.from._id,
                time:elt.updatedAt
              };
            case "interview":
              return {
                action: elt.action,
                name: elt.from.name,
                picture: elt.from.picture,
                length: elt.on.question.interviews.length,
                text: "a répondu à votre question.",
                url: "/post/" + elt.on._id,
                time:elt.updatedAt
              };

            default:
              break;
          }
        }),
      ],
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        try {
          await cacheDataLoaded;
          socket.on("new notification", ({ category, to }) => {
            dispatch(notificationSlice.util.invalidateTags(["Notification"]));
            if (category === "relation")
              dispatch(
                notificationSlice.util.invalidateTags([
                  { type: "Relation", id: to },
                ])
              );
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useFetchNotificationsQuery } = notificationSlice;
