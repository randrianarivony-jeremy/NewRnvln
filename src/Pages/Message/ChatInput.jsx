import {Button,HStack,Popover,PopoverArrow,PopoverBody,PopoverContent,PopoverTrigger,Portal,Textarea,useColorModeValue,} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendPicture from "./SendPicture";
import TakePicture from "./TakePicture";
import VoiceRecording from "./VoiceRecording";
import EmojiPicker from "emoji-picker-react";
import { chatContext } from "./Chat";
import { apiCall, currentUserContext } from "../../Controler/App";
import { useNavigate, useParams } from "react-router-dom";

const ChatInputs = ({sendResponse}) => {
  const responseRef = useRef();
  const { conversationId } = useParams();
  const {messages,setMessages,userB,newConversation,setNewConversation,submitting,setSubmitting,draft}=useContext(chatContext);
  const {currentUser}=useContext(currentUserContext);
  const [value, setValue] = useState("");
  const emojibg = useColorModeValue("light", "dark");
  const [writing, setWriting] = useState(false);
  const navigate = useNavigate();
  const mediaContent=useRef();

  const sendText = async() => {
    setWriting(false);
    setValue('');
    draft.current = {content:responseRef.current.value,contentType:'string',sender:currentUser._id}
    setSubmitting(true);
    if (newConversation) setNewConversation(false);
    await apiCall
    .post( "message",{
        sender:currentUser._id,
        recipient:newConversation ? conversationId : userB._id, //this conversationId from params would be the userId
        content:responseRef.current.value,
        conversationId: newConversation ? null : conversationId
      })
      .then(
        (res) => {
          setMessages([...messages,res.data]);
          setSubmitting(false);
          },
          (err) => {
          setSubmitting(false);
          console.log(err);
          navigate(-1);
        }
      );
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

  return (
    <>
      <HStack alignItems="flex-end" justify="flex-start">
        {!writing && (
          <>
            <TakePicture output={mediaContent}/>
            <SendPicture sendResponse={sendResponse} />
            <VoiceRecording sendResponse={sendResponse} />
          </>
        )}
        <HStack pos="relative" width="100%" align="flex-end" spacing={0}>
          {writing && (
            <Button
              variant="float"
              className="bi-chevron-right"
              onClick={() => setWriting(false)}
            ></Button>
          )}

          {/* <Emojis/> */}
          <Popover isLazy={true} returnFocusOnClose={false}>
            <PopoverTrigger>
              <Button
                pos="absolute"
                zIndex={2}
                className="bi-emoji-smile"
                left={writing ? 10 : 0}
                boxSize={38}
              ></Button>
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
            className="bi-send"
            variant="float"
            onClick={() =>
              responseRef.current.value.length > 0 ? sendText() : {}
            }
          ></Button>
        </HStack>
      </HStack>
    </>
  );
};

export default ChatInputs;
