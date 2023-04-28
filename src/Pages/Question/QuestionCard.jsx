import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AutoTextSize } from 'auto-text-size'

const QuestionCard = ({question}) => {
    return (
        <Flex width='100vw' height='100%'>
            <AutoTextSize>{question}</AutoTextSize>
        </Flex>
    );
};

export default QuestionCard;