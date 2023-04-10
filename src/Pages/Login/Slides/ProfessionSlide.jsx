import { Button, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import React from 'react';

const ProfessionSlide = ({swiper}) => {
    return (
        <Stack>
              <FormControl>
                <FormLabel>Quel travail faites-vous :</FormLabel>
                <Input placeholder="Profession" />
              </FormControl>
              <FormControl>
                <FormLabel>Où travaillez-vous :</FormLabel>
                <Input placeholder="Lieu de travail" />
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