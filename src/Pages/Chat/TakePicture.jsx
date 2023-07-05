import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  cameraOutline,
  cameraReverseOutline,
  close,
  radioButtonOn,
} from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import WebCam from "react-webcam";
import { ErrorRender } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  chatAdapter,
  chatSlice,
  useAddMessageMutation,
} from "../../Controler/Redux/Features/chatSlice";

const TakePicture = () => {
  const [camera, setCamera] = useState(false);
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const bg = useColorModeValue("white", "dark.50");
  const { data: conversation } =
    chatSlice.endpoints.fetchConversation.useQueryState(userId);
  const [addMessage, { isError, error }] = useAddMessageMutation();
  const { currentUser } = useContext(currentUserContext);
  const [cameraReady, setCameraReady] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const webcamRef = useRef();
  const imageRef = useRef();
  const urlRef = useRef();
  const patchResult = useRef();
  const dispatch = useDispatch();

  const capture = () => {
    imageRef.current = webcamRef.current.getScreenshot();
    setImagePreview(true);
  };

  const storePicture = () => {
    setCamera(false);
    setCameraReady(false);
    const now = Date.now();
    patchResult.current = dispatch(
      chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
        chatAdapter.addOne(draft, {
          _id: now,
          createdAt: new Date().toJSON(),
          sender: currentUser._id,
          recipient: userId,
          content: imageRef.current,
          conversationId: conversation?._id ?? null,
          contentType: "image",
          category,
        });
      })
    );
    fetch(imageRef.current)
      .then((response) => response.blob())
      .then((blob) => {
        imageRef.current = new File([blob], "sample.png", { type: blob.type });
        new Compressor(imageRef.current, {
          quality: 0.6,
          success(result) {
            const fileName = new Date().getTime() + `${currentUser._id}`;
            const storageRef = ref(storage, "conversation/image/" + fileName);
            uploadBytes(storageRef, result).then((snapshot) =>
              getDownloadURL(snapshot.ref).then((url) => {
                urlRef.current = url;
                addMessage({
                  _id: now,
                  sender: currentUser._id,
                  recipient: userId,
                  content: urlRef.current,
                  conversationId: conversation?._id ?? null,
                  contentType: "image",
                  category,
                });
              })
            );
          },
          error(err) {
            console.log({ Error: "Image compression error " + err.message });
          },
        });
      });
  };

  useEffect(() => {
    if (isError) patchResult.current.undo();
  }, [error, isError]);

  return (
    <Flex>
      <Button variant="float" onClick={() => setCamera(!camera)}>
        <IonIcon icon={cameraOutline} />
      </Button>

      {camera && (
        <Stack
          position="absolute"
          zIndex={3}
          top={0}
          bgColor={bg}
          left={0}
          spacing={0}
          height="100%"
        >
          {cameraReady && (
            <Box minH={10} width="100%" bgColor={bg}>
              {!imagePreview && (
                <Flex justify="space-between" height={10} width="100%">
                  <Button
                    fontSize="2xl"
                    onClick={() => {
                      setCamera(false);
                      setCameraReady(false);
                    }}
                  >
                    <IonIcon icon={close} />
                  </Button>
                  <Button
                    fontSize="2xl"
                    onClick={() =>
                      facingMode === "user"
                        ? setFacingMode("environment")
                        : setFacingMode("user")
                    }
                  >
                    <IonIcon icon={cameraReverseOutline} />
                  </Button>
                </Flex>
              )}
            </Box>
          )}

          {imagePreview && (
            <Box
              position="absolute"
              top={10}
              left={0}
              height="100%"
              bgColor={bg}
            >
              <Image src={imageRef.current} alt="image preview" />
            </Box>
          )}
          <WebCam
            ref={webcamRef}
            onUserMedia={() => setCameraReady(true)}
            mirrored={facingMode === "user" ? true : false}
            // videoConstraints={{ facingMode, height: "100vh", width: "100vw" }}
            videoConstraints={{ facingMode, aspectRatio: 1 / 1 }} //ty ny tena izy
            onUserMediaError={() => setCamera(false)}
            screenshotFormat="image/jpeg"
            style={{
              width: "100vw",
              // height: "100vh",
              // position: "absolute",
              // top: 0,
              aspectRatio: 1 / 1,
              objectFit: "cover",
            }}
            audio={false}
          />

          {cameraReady && (
            <Flex
              align="center"
              justify="center"
              bottom={2}
              width="100%"
              height={100}
              position="absolute"
            >
              {!imagePreview ? (
                <Button
                  boxSize={100}
                  bgColor="transparent"
                  fontSize={"6xl"}
                  onClick={capture}
                >
                  <IonIcon icon={radioButtonOn} />
                </Button>
              ) : (
                <HStack width="100%">
                  <Button width="100%" onClick={() => setImagePreview(false)}>
                    Reprendre
                  </Button>
                  <Button width="100%" variant="primary" onClick={storePicture}>
                    Envoyer
                  </Button>
                </HStack>
              )}
            </Flex>
          )}
        </Stack>
      )}
    </Flex>
  );
};

export default TakePicture;
