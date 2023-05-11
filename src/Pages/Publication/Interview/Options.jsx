import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { optionContext } from './Interview';
import PubText from './PubText';
import SendVoice from './SendVoice';
import TakePhoto from './TakePhoto';
import TakeVideo from './TakeVideo';
import UploadPhoto from './UploadPhoto';
import UploadVideo from './UploadVideo';

const Options = () => {
    const {setDisplay}=useContext(optionContext);
    return (
        <Stack>
          <HStack alignItems="center" justify="center">
            <SendVoice/>
            <Button variant="outline" flexDir="column" boxSize={120} onClick={()=>setDisplay(<PubText/>)}>
              <Flex fontSize={40}>Aa</Flex>
              <Text fontSize='xs'>Texte</Text>
            </Button>
          </HStack>
          <HStack alignItems="center" justify="center">
            <TakePhoto />
            <UploadPhoto/>
          </HStack>
          <HStack alignItems="center" justify="center">
            <TakeVideo/>
            <UploadVideo/>
          </HStack>
        </Stack>
    );
};

export default Options;