import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    return (
        <Flex>
            <Button className='bi-arrow-left' onClick={()=>navigate(-1)}></Button>
            <Input ref={inputRef} placeholder='Rechercher' autoFocus borderRadius='full'/>
            <Button className='bi-search' 
            onClick={()=>inputRef.current.value==='' ? {} : navigate('/search/'+inputRef.current.value)}></Button>
        </Flex>
    );
};

export default Search;