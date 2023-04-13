import {Button,FormControl,FormLabel,HStack,Image,Input,Stack,} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { signUpContext } from "../Login";

const ProfilePictureSlide = ({ swiper }) => {
  const fileRef = useRef();
  let { picture } = useContext(signUpContext);
  const [selectedImage, setSelectedImage] = useState();

  const handleChange = ({ currentTarget }) => {
    try {
      picture.current = currentTarget.files[0];
      setSelectedImage(URL.createObjectURL(currentTarget.files[0]));
    } catch (error) {
      return;
    }
  };

  return (
    <Stack>
      <FormControl>
        <FormLabel textAlign="center">
          Choisissez votre photo de profil :
        </FormLabel>
        <Input type="file" display="none" ref={fileRef} accept=".jpeg,.jpg,.png" onChange={handleChange} />
        {selectedImage ? (
          <Image src={selectedImage} alt="profilepicture" boxSize={150} borderRadius="full" objectFit="cover" margin="auto"
            onClick={() => fileRef.current.click()}
          />
        ) : (
          <Button className="bi-camera" boxSize={120} border="1px solid" borderRadius="full" fontSize={60}
            onClick={() => fileRef.current.click()}
          ></Button>
        )}
      </FormControl>

      <HStack>
        <Button width="100%" onClick={() => swiper.slidePrev()}>
          Précédent
        </Button>
        <Button variant="primary" width="100%"
          onClick={() => swiper.slideNext()}
        >
          Suivant
        </Button>
      </HStack>
    </Stack>
  );
};

export default ProfilePictureSlide;
