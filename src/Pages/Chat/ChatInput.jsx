import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import EmojiPicker from "emoji-picker-react";
import { chevronForward, happyOutline, send } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorRender } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import {
  useAddMessageMutation,
  useFetchConversationQuery,
} from "../../Controler/Redux/Features/chatSlice";
import SendPicture from "./SendPicture";
import TakePicture from "./TakePicture";
import VoiceRecording from "./VoiceRecording";

const ChatInputs = ({ sendResponse }) => {
  const responseRef = useRef();
  const { userId } = useParams();
  const { data: conversation } = useFetchConversationQuery(userId);
  const { currentUser } = useContext(currentUserContext);
  const [value, setValue] = useState("");
  const emojibg = useColorModeValue("light", "dark");
  const [writing, setWriting] = useState(false);
  const mediaContent = useRef();
  const [addMessage, { isError, error }] = useAddMessageMutation();

  const sendText = async () => {
    setWriting(false);
    setValue("");
    addMessage({
      _id: Date.now(),
      sender: currentUser._id,
      recipient: userId, //this conversationId from params would be the userId
      content: responseRef.current.value,
      conversationId: conversation?._id ?? null,
      contentType: "string",
      createdAt: new Date().toJSON(),
    });
  };

  const handleTextChange = ({ currentTarget }) => {
    setValue(currentTarget.value);
    setWriting(true);
  };

  const emojiClick = (emojiData) => {
    responseRef.current.value += emojiData.emoji;
  };

  useEffect(() => {
    if (responseRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      responseRef.current.style.height = "40px";
      const scrollHeight = responseRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight < 300)
        responseRef.current.style.height = scrollHeight + "px";
      else responseRef.current.style.height = 300 + "px";
    }
  }, [responseRef, value]);

  if (isError) return <ErrorRender isError={isError} error={error} />;

  return (
    <>
      <HStack alignItems="flex-end" justify="flex-start">
        {!writing && (
          <>
            <TakePicture output={mediaContent} />
            <SendPicture sendResponse={sendResponse} />
            <VoiceRecording sendResponse={sendResponse} />
          </>
        )}
        <HStack pos="relative" width="100%" align="flex-end" spacing={0}>
          {writing && (
            <Button variant="float" onClick={() => setWriting(false)}>
              <IonIcon icon={chevronForward} />
            </Button>
          )}

          {/* <Emojis/> */}
          <Popover isLazy={true} returnFocusOnClose={false}>
            <PopoverTrigger>
              <Button
                variant={"float"}
                pos="absolute"
                zIndex={2}
                left={writing ? 10 : 0}
              >
                <IonIcon icon={happyOutline} />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody style={{ padding: 0 }}>
                  <EmojiPicker
                    theme={emojibg}
                    height="200px"
                    lazyLoadEmojis={true}
                    searchDisabled={true}
                    width="100%"
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={emojiClick}
                  />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          <Textarea
            ref={responseRef}
            rows={1}
            placeholder="Ecrire"
            value={value}
            paddingLeft={10}
            sx={{
              "::-webkit-scrollbar": { display: "none" },
              "::-webkit-resizer": { display: "none" },
            }}
            onChange={handleTextChange}
          ></Textarea>
          <Button
            variant="float"
            onClick={() =>
              responseRef.current.value.length > 0 ? sendText() : {}
            }
          >
            <IonIcon icon={send} />
          </Button>
        </HStack>
      </HStack>
    </>
  );
};

export default ChatInputs;
