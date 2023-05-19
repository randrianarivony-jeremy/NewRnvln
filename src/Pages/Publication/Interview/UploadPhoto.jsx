import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { displayContext } from './InterviewSlide';
import PubMedia from './PubMedia';

const UploadPhoto = () => {
    const inputRef=useRef();
    const {setDisplay}=useContext(displayContext);
    const toast = useToast();

    const handleChange=({currentTarget})=>{
        if(currentTarget.files[0].size<4096000)
        setDisplay(<PubMedia data={{content:currentTarget.files[0],contentType:'image'}}/>);
        else toast({
            title:'Limite excédée',
            description:'Votre fichier est trop lourd. Veuillez ne pas dépasser les 4 mo',
            status:'info',
            duration:5000,
            isClosable:true
        })
    }
    return (
        <div>
            <Button variant="outline" flexDir="column" height="30vw"
              maxH={120}
              width="30vw"
              maxW={120} onClick={()=>inputRef.current.click()}>
              <Flex fontSize={40} className="bi-image"></Flex>
              <Text fontSize='xs'>Image</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.jpeg,.jpg,.png' display='none'
            onChange={(e)=>e.target.files.length>0 && handleChange(e)}
            />
        </div>
    );
};

export default UploadPhoto;