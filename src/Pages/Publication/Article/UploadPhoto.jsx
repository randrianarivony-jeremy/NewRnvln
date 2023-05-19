import { Button, Input, Text, useToast } from '@chakra-ui/react';
import { IonIcon } from '@ionic/react';
import { imageOutline } from 'ionicons/icons';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationContext } from '../../../Controler/Context';

const UploadPhoto = () => {
    const inputRef=useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange=({currentTarget})=>{
        if(currentTarget.files[0].size<4096000){
            setContent({content:currentTarget.files[0],contentType:'image'});
            navigate('/publication/media');
        }
        else toast({
            title:'Limite excédée',
            description:'Votre fichier est trop lourd. Veuillez ne pas dépasser les 4 mo',
            status:'info',
            duration:5000,
            isClosable:true
        })
    }
    return (
        <>
            <Button variant="outline" flexDir="column" height='30vw' maxH={120} width='30vw' maxW={120} onClick={()=>inputRef.current.click()}>
              <IonIcon icon={imageOutline} style={{fontSize:'40px'}}/>
              <Text fontSize='xs'>Image</Text>
            </Button>
            <Input type='file' ref={inputRef} accept='.jpeg,.jpg,.png' display='none' onChange={handleChange}/>
        </>
    );
};

export default UploadPhoto;