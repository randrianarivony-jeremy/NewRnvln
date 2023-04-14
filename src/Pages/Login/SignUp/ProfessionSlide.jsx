import { Button, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { signUpContext } from '../Login';

const ProfessionSlide = ({swiper}) => {
  const {job,address}=useContext(signUpContext);
    return (
        <Stack>
              <FormControl>
                <FormLabel>Quel travail faites-vous :</FormLabel>
                <Input type='text' ref={job} placeholder="Profession" />
              </FormControl>
              <FormControl>
                <FormLabel>Où travaillez-vous :</FormLabel>
                <Input type='text' ref={address} placeholder="Lieu de travail" />
              </FormControl>
              <HStack>
              <Button width='100%'
                onClick={() =>swiper.slidePrev()}
              >
                Précédent
              </Button>
              <Button variant="primary" width='100%'
                onClick={() =>swiper.slideNext()}
              >
                Suivant
              </Button>
              </HStack>
            </Stack>
    );
};

export default ProfessionSlide;