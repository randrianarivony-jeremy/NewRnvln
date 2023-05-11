import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationContext } from '../../../Controler/Context';

const UploadVideo = () => {
    const inputRef=useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();

    const handleChange=({currentTarget})=>{
        setContent({content:currentTarget.files[0],contentType:'video'});
        navigate('/publication/media');
    }
    return (
        <>
            <Button variant="outline" flexDir="column" height='30vw' maxH={120} width='30vw' maxW={120} onClick={()=>inputRef.current.click()}>
              <Flex fontSize={40} className="bi-film"></Flex>
              <Text fontSize='xs'>Video</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.mp4,.webm' display='none' onChange={handleChange}/>
        </>
    );
};

export default UploadVideo;