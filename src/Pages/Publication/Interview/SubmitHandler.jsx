import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";
import { interviewContext } from "./Interview";

const SubmitHandler = () => {
  const { questionId } = useParams();
  const navigate=useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [multipleQuestion, setMultipleQuestion] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { responseData, swiperRef,publicConfidentiality } = useContext(interviewContext);
  const { currentUser } = useContext(currentUserContext);
  const empty = useRef();

  const uploadMedia = async (elt) => {
    const fileName = elt.content.name + `${currentUser._id}`;
    const data = await uploadBytes(
      ref(storage, "interview/" + `${elt.contentType}` + "/" + fileName),
      elt.content
    );
    return {
      content: data,
      contentType: elt.contentType,
      description: elt.description,
    };
  };

  const handleSubmit = () => {
    //some empty response
    empty.current = responseData.current.indexOf("empty");
    if (empty.current !== -1) {
      swiperRef.current.swiper.slideTo(empty.current);
      onOpen();
    }
    //everything is ok
    else {
      setSubmitting(true);
      let storagePromises = [];
      responseData.current.map((elt) => {
        if (elt.contentType === "short" || elt.contentType === "text") {
          storagePromises.push(elt);
          console.log(elt);
        } else {
          storagePromises.push(uploadMedia(elt));
        }
      });
      //store media to firebase
      Promise.all(storagePromises)
        .then((res) => {
          let urlPromises = [];
          console.log(res);
          res.map((data) => {
            if (data.contentType === "short" || data.contentType === "text") {
              urlPromises.push(data);
            } else {
              urlPromises.push(
                getDownloadURL(data.content.ref).then((url) => {
                  return {
                    content: url,
                    contentType: data.contentType,
                    description: data.description,
                  };
                })
              );
            }
          });
          //get media url
          Promise.all(urlPromises)
            .then(async (payload) => {
              //send to database
              await apiCall
                .post("interview", {
                  data: payload,
                  public: publicConfidentiality.current,
                  id_user: currentUser._id,
                  question: questionId,
                })
                .then(
                  (res) => {
                    toast({
                      title: "Publication réussie",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      description: "Votre interview a été bien enregistrée !",
                    });
                    navigate("/");
                  },
                  (err) => {
                    console.log("database error: " + err);
                    toast({
                      status: "error",
                      isClosable: true,
                      duration: 5000,
                      description: "Veuillez réessayer s'il vous plait",
                      title: "Operation failed",
                    });
                  }
                )
                .finally(() => setSubmitting(false));
            })
            .catch((error) => {
              console.log("url promises error: " + error);
            });
        })
        .catch((error) => console.log("upload to storage error: " + error));
    }
  };

  useEffect(() => {
    if (responseData.current.length < 2) setMultipleQuestion(false);
    else setMultipleQuestion(true);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <Button
          isLoading={submitting}
          width={multipleQuestion ? "fit-content" : "100%"}
          variant={multipleQuestion ? "ghost" : "primary"}
          loadingText="Envoi"
          // onClick={()=>uploadMedia(responseData.current[1])}
          onClick={handleSubmit}
        >
          Publier
        </Button>
      )}
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Avertissement</DrawerHeader>
          <DrawerBody>
            Vous avez oublié de répondre à la question {empty.current + 1}.
          </DrawerBody>
          <DrawerFooter>
            <ButtonGroup>
              <Button variant={"outline"} onClick={handleSubmit}>
                Publier
              </Button>
              <Button variant={"primary"} onClick={onClose}>
                Compléter
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SubmitHandler;
