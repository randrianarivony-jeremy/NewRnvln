import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { userContext } from "../UserProfile";

const FriendHandler = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { user } = useContext(userContext);
  const toast = useToast();
  const [friend, setFriend] = useState("none");
  const [submitting, setSubmitting] = useState(false);

  const addFriend = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
        "user/friend_invitation/",
        { to: user._id, from: currentUser._id }
      )
      .then(
        () => {
              setCurrentUser({...currentUser,friendInvitation:[...currentUser.friendInvitation,user._id]})
        },
        () => {
          toast({
            status:'error',
            duration:5000,
            isClosable:true,
            title:'Error',
            description:'Une erreur est survenue'
          })
        }
      ).finally(()=>setSubmitting(false));
  };

  const confirmRequest = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
        "user/accept_friend/",
        { to: user._id, from: currentUser._id }
      )
      .then(
        () => {
              setCurrentUser({...currentUser,
                friendRequest:currentUser.friendRequest.filter(elt=>elt!==user._id),
                friends:[...currentUser.friends,user._id]
              });
          setSubmitting(false);
        },
        () => {
          toast({
            status:'error',
            duration:5000,
            isClosable:true,
            title:'Error',
            description:'Une erreur est survenue'
          })
        }
      ).finally(()=>setSubmitting(false));
  };
  const cancelInvitation = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
        "user/cancel_invitation/",
        { to: user._id, from: currentUser._id }
      )
      .then(
        () => {
              setCurrentUser({...currentUser,friendInvitation:currentUser.friendInvitation.filter(elt=>elt!==user._id)});
          setSubmitting(false);
        },
        () => {
          toast({
            status:'error',
            duration:5000,
            isClosable:true,
            title:'Error',
            description:'Une erreur est survenue'
          })
        }
      ).finally(()=>setSubmitting(false));
  };

  const pullFriend = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
        "user/pull_friend/",
        { to: user._id, from: currentUser._id }
      )
      .then(
        () => {
              setCurrentUser({...currentUser,friends:currentUser.friends.filter(elt=>elt!==user._id)});
          setSubmitting(false);
        },
        () => {
          toast({
            status:'error',
            duration:5000,
            isClosable:true,
            title:'Error',
            description:'Une erreur est survenue'
          })
        }
      ).finally(()=>setSubmitting(false));
  };

  useEffect(() => {
    if (currentUser.friends.includes(user._id)) setFriend("friend");
    else {
      if (currentUser.friendRequest.includes(user._id)) setFriend("request");
      else {
        if (currentUser.friendInvitation.includes(user._id))
          setFriend("invitation");
        else setFriend("none");
      }
    }
  }, [currentUser, user]);

  return (
    <>
      {friend === "none" ? (
        <Button isLoading={submitting} width="100%" variant="primary"
          onClick={() => (currentUser._id === user._id ? null : addFriend())}
        >
          Ajouter
        </Button>
      ) : friend === "friend" ? (
        <Button isLoading={submitting} width="100%" variant="outline"
          onClick={() => (currentUser._id === user._id ? null : pullFriend())}
        >
          Amis
        </Button>
      ) : friend === "request" ? (
        <Button isLoading={submitting} width="100%" variant="outline"
          onClick={() => (currentUser._id === user._id ? null : confirmRequest())}
        >
          Confirmer
        </Button>
      ) : (
        <Button isLoading={submitting} width="100%" variant="outline"
          onClick={() => (currentUser._id === user._id ? null : cancelInvitation())}
        >
          Invitation envoyée
        </Button>
      )}
    </>
  );
};

export default FriendHandler;
