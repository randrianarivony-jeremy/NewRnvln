import { Button, Flex, Input } from '@chakra-ui/react';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    return (
        <Flex>
            <Button className='bi-arrow-left' onClick={()=>navigate(-1)}></Button>
            <Input ref={inputRef} placeholder='Rechercher' autoFocus borderRadius='full'/>
            <IonIcon icon={search} style={{fontSize:'20px'}}
            onClick={()=>inputRef.current.value==='' ? {} : navigate('/search/'+inputRef.current.value)}/>
        </Flex>
    );
};

export default Search;