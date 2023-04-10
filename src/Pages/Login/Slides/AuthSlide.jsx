import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthSlide = () => {
    const [usePhoneNumber,setUsePhoneNumber]=useState(true);
    const navigate = useNavigate();

    const handleSubmit=()=>{
      navigate('/');
    }
    return (
      <Stack>
        {usePhoneNumber ? <FormControl>
          <FormLabel>Entrez votre numéro de mobile :</FormLabel>
          <Input placeholder="Numéro" type="number" maxLength="10" minLength="10"   />
        </FormControl> :
        <FormControl>
          <FormLabel>Entrez votre adresse email :</FormLabel>
          <Input placeholder="Adresse email" type="email"/>
        </FormControl>}
        <FormControl>
          <FormLabel>Entrez votre mot de passe :</FormLabel>
          <Input placeholder="Mot de passe" type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirmer votre mot de passe :</FormLabel>
          <Input placeholder="Mot de passe" type="password" />
        </FormControl>
        <Button variant="primary" onClick={handleSubmit}>Terminé</Button>
        
        <Button variant='link' onClick={()=>setUsePhoneNumber(!usePhoneNumber)}>
            {usePhoneNumber ? 'Utiliser une adresse email' : 'Utiliser un numéro de téléphone'}
        </Button>
        
      </Stack>
    );
};

export default AuthSlide;