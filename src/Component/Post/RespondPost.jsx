import { Button } from '@chakra-ui/react';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const RespondPost = () => {
    return (
        <Button boxSize={10}>
              <FontAwesomeIcon size='lg' icon={faComments}></FontAwesomeIcon>
            </Button>
    );
};

export default RespondPost;