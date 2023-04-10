import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationContext } from '../../Controler/Context';

const UploadVideo = () => {
    const inputRef=useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();

    const handleChange=({currentTarget})=>{
        setContent({content:URL.createObjectURL(currentTarget.files[0]),type:'video'});
        navigate('/publication/image');
    }
    return (
        <div>
            <Button variant="outline" flexDir="column" boxSize={120} onClick={()=>inputRef.current.click()}>
              <Flex fontSize={40} className="bi-film"></Flex>
              <Text fontSize='xs'>Video</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.mp4,.webm' display='none' onChange={handleChange}/>
        </div>
    );
};

export default UploadVideo;