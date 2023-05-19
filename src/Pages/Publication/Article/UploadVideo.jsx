import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { IonIcon } from '@ionic/react';
import { filmOutline } from 'ionicons/icons';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationContext } from '../../../Controler/Context';

const UploadVideo = () => {
    const inputRef=useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange=({currentTarget})=>{
        if(currentTarget.files[0].size<20480000){
            setContent({content:currentTarget.files[0],contentType:'video'});
            navigate('/publication/media');
        }
        else toast({
            title:'Limite excédée',
            description:'Votre fichier est trop lourd. Veuillez ne pas dépasser les 20 mo',
            status:'info',
            duration:5000,
            isClosable:true
        })
    }
    return (
        <>
            <Button variant="outline" flexDir="column" height='30vw' maxH={120} width='30vw' maxW={120} onClick={()=>inputRef.current.click()}>
              <IonIcon icon={filmOutline} style={{fontSize:'40px'}}/>
              <Text fontSize='xs'>Video</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.mp4,.webm' display='none' onChange={handleChange}/>
        </>
    );
};

export default UploadVideo;