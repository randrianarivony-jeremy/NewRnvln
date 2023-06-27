import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TakePhoto from "../../../Component/TakePhoto";
import { currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";
import { useChangeProfilePicMutation } from "../../../Controler/Redux/Features/userSlice";

const ProfilePicture = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [changeProfilePic, { isSuccess, data, isError, error }] =
    useChangeProfilePicMutation();

  const profilePicInputRef = useRef();
  const picture = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState();
  const [camera, setCamera] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: openProfilePicView,
    onClose: closeProfilePicView,
    isOpen: profilePicView,
  } = useDisclosure();

  const handleCamera = (imgSrc) => {
    picture.current = { content: imgSrc, contentType: "image" };
    setSelectedImage(imgSrc);
    onOpen();
  };

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

  const storePicture = () => {
    setSubmitting(true);
    const fileName = new Date().getTime() + currentUser._id;
    const storageRef = ref(storage, "profile/picture/" + fileName);
    uploadBytes(storageRef, picture.current.content).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        changeProfilePic({
          userId: currentUser._id,
          picture: url,
        });
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser({ ...currentUser, picture: data.picture });
      setSubmitting(false);
      onClose();
    }
    if (isError) {
      if (error.status === 403) {
        toast({
          title: "Expiration",
          description:
            "Vous avez atteint un mois de connexion. Veillez vous reconnecter",
          status: "info",
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        setSubmitting(false);
        onClose();
        toast({
          title: "Modification échouée",
          description:
            "La modification de votre photo de profil a malheureusement échoué. Veuillez réessayer ultérieurement",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      }
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Menu>
        <MenuButton position={"relative"}>
          {currentUser.picture ? (
            <>
              <Image
                src={currentUser.picture}
                alt="profile_pic"
                boxSize="60px"
                minW="60px"
                rounded="full"
                objectFit="cover"
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
              />
              {imgLoading && (
                <SkeletonCircle
                  size={"60px"}
                  position="absolute"
                  top={0}
                  zIndex={1}
                />
              )}
            </>
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
              border={"solid 1px"}
              borderColor="gray.400"
              height={"75vh"}
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

      {/* P R O F I L E  V I E W  */}
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
