import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationContext } from '../../Controler/Context';

const UploadPhoto = () => {
    const inputRef=useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();

    const handleChange=({currentTarget})=>{
        setContent({content:URL.createObjectURL(currentTarget.files[0]),type:'image'});
        navigate('/publication/media');
    }
    return (
        <div>
            <Button variant="outline" flexDir="column" boxSize='30vw' onClick={()=>inputRef.current.click()}>
              <Flex fontSize={40} className="bi-image"></Flex>
              <Text fontSize='xs'>Image</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.jpeg,.jpg,.png' display='none' onChange={handleChange}/>
        </div>
    );
};

export default UploadPhoto;