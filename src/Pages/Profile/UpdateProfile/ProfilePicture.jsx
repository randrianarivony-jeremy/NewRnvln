import {Avatar,Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerHeader,Image,Input,Menu,MenuButton,MenuItem,MenuList,useDisclosure,} from "@chakra-ui/react";
import Compressor from "compressorjs";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import TakePhoto from "../../../Component/TakePhoto";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";

const ProfilePicture = () => {
  const profilePicInputRef = useRef();
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);
  const picture = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const [camera, setCamera] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: openProfilePicView,
    onClose: closeProfilePicView,
    isOpen: profilePicView,
  } = useDisclosure();

  const handleChange = ({ currentTarget }) => {
    try {
      new Compressor(currentTarget.files[0], {
        quality: 0.6,
        success(result) {
          picture.current = {
            content: result,
            contentType: "image",
          };
          setSelectedImage(URL.createObjectURL(result));
          onOpen();
        },
        error(err) {
          console.log({ Error: "Image compression error " + err.message });
        },
      });
    } catch (error) {
      return;
    }
  };

  const handleCamera = (imgSrc) => {
    picture.current = { content: imgSrc, contentType: "image" };
    setSelectedImage(imgSrc);
    onOpen();
  };

  const storePicture = () => {
    setSubmitting(true);
    const fileName = new Date().getTime() + currentUser._id;
    const storageRef = ref(storage, "profile/picture/" + fileName);
    if (picture.current.contentType === "image_url")
      uploadString(storageRef, picture.current.content, "data_url").then(
        (snapshot) =>
          getDownloadURL(snapshot.ref).then((url) => {
            picture.current = url;
            changeProfilePicture();
          })
      );
    else
      uploadBytes(storageRef, picture.current.content).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          picture.current = url;
          changeProfilePicture();
        })
      );
  };

  const changeProfilePicture = async () => {
    await apiCall
      .put("user/profilepicture/" + currentUser._id, {
        picture: picture.current,
      })
      .then(
        (res) => {
          setSubmitting(false);
          setCurrentUser({ ...currentUser, picture: res.data.picture });
          onClose();
        },
        (err) => {
          setSubmitting(false);
          console.log(err);
        }
      );
  };
  return (
    <>
      <Menu>
        <MenuButton>
          {currentUser.picture ? (
            <Image
              src={currentUser.picture}
              alt="profile_pic"
              boxSize="60px"
              minW="60px"
              rounded="full"
              objectFit="cover"
            />
          ) : (
            <Avatar size="md" />
          )}
        </MenuButton>
        <MenuList>
          {currentUser.picture && (
            <MenuItem onClick={openProfilePicView}>
              Voir la photo de profil
            </MenuItem>
          )}
          <MenuItem onClick={() => profilePicInputRef.current.click()}>
            Selectionner dans le téléphone
          </MenuItem>
          <MenuItem onClick={() => setCamera(true)}>Prendre une photo</MenuItem>
          <TakePhoto
            camera={camera}
            setCamera={setCamera}
            output={handleCamera}
          />
        </MenuList>
      </Menu>
      <Input
        type="file"
        display="none"
        ref={profilePicInputRef}
        accept=".png,.jpg,.jpeg"
        onChange={handleChange}
      />
      <Drawer isOpen={isOpen} onOpen={onOpen} placement="bottom">
        <DrawerContent>
          <DrawerHeader>Changer votre photo de profil</DrawerHeader>
          <DrawerBody>
            <Image
              src={selectedImage}
              alt="profilepic"
              width="100%"
              objectFit="contain"
            />
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={onClose}>Annuler</Button>
            <Button
              isLoading={submitting}
              variant="outline"
              onClick={storePicture}
            >
              Changer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        size="full"
        isOpen={profilePicView}
        onOpen={openProfilePicView}
        onClose={closeProfilePicView}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <Image
            src={currentUser.picture}
            alt="profilePic"
            width="100%"
            margin="auto"
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfilePicture;
