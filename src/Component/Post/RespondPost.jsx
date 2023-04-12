import { Button } from '@chakra-ui/react';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RespondPost = ({post}) => {
    const navigate=useNavigate();
    return (
        <Button boxSize={12} color={post.contentType==='string' && post.bg!=='transparent' && 'black'} onClick={()=>navigate('/interview/646156565')}>
              <FontAwesomeIcon size='xl' icon={faComments}></FontAwesomeIcon>
            </Button>
    );
};

export default RespondPost;