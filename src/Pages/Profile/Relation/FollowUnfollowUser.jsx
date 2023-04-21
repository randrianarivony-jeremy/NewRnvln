import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { currentUserContext } from "../../../Controler/App";
import { userContext } from "../UserProfile";

const FollowUnfollowUser = () => {
  const { currentUser,setCurrentUser } = useContext(currentUserContext);
  const {user,setUser}=useContext(userContext);
  const [followed, setFollowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFollow = async () => {
    setSubmitting(true);
    await axios
      .patch(
        process.env.REACT_APP_API_URL + "/api/user/follow/" + currentUser._id,
        { id_user:user._id, follow: !followed }
      )
      .then(
        () => {
            if (followed){ 
                setCurrentUser({...currentUser,followings:currentUser.followings.filter(elt=>elt!==user._id)});
                setUser({...user,followers:user.followers.filter(elt=>elt!==currentUser._id)})
            }
            else {
                setCurrentUser({...currentUser,followings:[...currentUser.followings,user._id]})
                setUser({...user,followers:[...user.followers,currentUser._id]})
            }
            setSubmitting(false)
        },
        (err) => {console.log(err);setSubmitting(false)}
      );
  };

  useEffect(() => {
    if (currentUser.followings.includes(user._id)) setFollowed(true);
    else setFollowed(false);
  }, [currentUser,user]);
  
  return (
    <Button isLoading={submitting}
      width="100%"
      variant="outline"
      rounded="full"
      onClick={handleFollow}
    >
      {followed ? "Suivi" : "Suivre"}
    </Button>
  );
};

export default FollowUnfollowUser;
