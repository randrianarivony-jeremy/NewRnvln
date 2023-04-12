import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { optionContext } from './Interview';
import PubText from './PubText';
import PublishVideo from './PublishVideo';
import SendVoice from './SendVoice';
import TakePhoto from './TakePhoto';
import UploadPhoto from './UploadPhoto';
import UploadVideo from './UploadVideo';

const Options = () => {
    const {setDisplay}=useContext(optionContext);
    return (
        <Stack>
          <HStack alignItems="center" justify="center">
            <TakePhoto />
            <Button variant="outline" flexDir="column" boxSize={120} onClick={()=>setDisplay(<PubText/>)}>
              <Flex fontSize={40}>Aa</Flex>
              <Text fontSize='xs'>Texte</Text>
            </Button>
          </HStack>
          <HStack alignItems="center" justify="center">
            <UploadPhoto/>
            <UploadVideo/>
          </HStack>
          <HStack alignItems="center" justify="center">
            <SendVoice/>
            <PublishVideo/>
          </HStack>
        </Stack>
    );
};

export default Options;