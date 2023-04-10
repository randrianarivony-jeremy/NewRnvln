import {Button,FormControl,FormLabel,HStack,Image,Input,Stack,} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const ProfilePictureSlide = ({ swiper }) => {
  const fileRef = useRef();
  const [selectedImage, setSelectedImage] = useState();

  const handleChange=({currentTarget})=>{
    setSelectedImage(URL.createObjectURL(currentTarget.files[0]))
  }
  
  return (
    <Stack>
      <FormControl>
        <FormLabel textAlign='center'>Choisissez votre photo de profil :</FormLabel>
        <Input type="file" display="none" ref={fileRef}
          onChange={handleChange}
        />
        {selectedImage ? <Image src={selectedImage} alt="profilepicture" boxSize={150} borderRadius='full' objectFit='cover' margin='auto'/>
        :<Button className="bi-camera" boxSize={120} border="1px solid" borderRadius="full" fontSize={60}
          onClick={() => fileRef.current.click()}
        ></Button>}
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
