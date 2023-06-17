import { Button, Flex, Skeleton } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Scroll } from "../../Component/Miscellanous";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import ChatInput from "./ChatInput";
import ChatScroller from "./ChatScroller";

const Chat = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: user, isLoading, isSuccess } = useFetchUserQuery(userId);

  let display;

  if (isLoading) display = <Skeleton height={5} width="50vw" />;
  if (isSuccess) {
    display = (
      <Button
        size={"lg"}
        paddingX={0}
        onClick={() => navigate("/profile/" + userId)}
      >
        {user.name} &nbsp;{" "}
        <Flex fontStyle="italic" fontWeight="normal">
          {user.job}
        </Flex>
      </Button>
    );
  }

  return (
    <Scroll
      height="100%"
      className="chat"
      paddingBottom={2}
      position="relative"
    >
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button boxSize={12} onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
        </Button>
        {display}
      </Flex>
      <ChatScroller />
      <ChatInput />
    </Scroll>
  );
};

export default Chat;
