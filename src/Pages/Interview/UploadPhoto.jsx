import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { optionContext } from './Interview';
import PubMedia from './PubMedia';

const UploadPhoto = () => {
    const inputRef=useRef();
    const {setDisplay}=useContext(optionContext);

    const handleChange=({currentTarget})=>{
        setDisplay(<PubMedia data={{content:URL.createObjectURL(currentTarget.files[0]),type:'image'}}/>);
    }
    return (
        <div>
            <Button variant="outline" flexDir="column" boxSize={120} onClick={()=>inputRef.current.click()}>
              <Flex fontSize={40} className="bi-image"></Flex>
              <Text fontSize='xs'>Image</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.jpeg,.jpg,.png' display='none' onChange={handleChange}/>
        </div>
    );
};

export default UploadPhoto;