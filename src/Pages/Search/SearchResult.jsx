import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResult = () => {
    const navigate = useNavigate();
    return (
        <div>
        <Button className='bi-arrow-left' onClick={()=>navigate(-1)}></Button>
            SearchResult
        </div>
    );
};

export default SearchResult;