import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { signUpContext } from '../Login';

const UsernameSlide = ({swiper}) => {
    const {name}=useContext(signUpContext);

    const handleNext=e=>{
      e.preventDefault();
      swiper.current.swiper.slideNext()
    }
    return (
        <form onSubmit={handleNext}>
            <Stack>
              <FormControl>
                <FormLabel>Quel nom voulez-vous utiliser :</FormLabel>
                <Input type='text' ref={name} placeholder="Nom d'utilisateur"isRequired/>
              </FormControl>
              <Input as='button' type='submit' bgColor='bleu' fontWeight='semibold'>Suivant</Input>
            </Stack>
            </form>
    );
};

export default UsernameSlide;