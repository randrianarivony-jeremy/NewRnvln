import { Avatar, Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Question = ({ question }) => {
  const textRef = useRef();
  const isOverflowed = useRef();
  const [expandBtn, setExpandBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (textRef.current.scrollHeight > 45) isOverflowed.current = true;
    setLoading(false);
  }, []);

  return (
    <Box
      paddingX={3} bg={question?.bg}
      paddingY={2}
      rounded="lg"
      borderTopLeftRadius={0}
    >
      <HStack>
        {question.interviewer.picture ? <Image src={question.interviewer.picture} boxSize={10} rounded='full' objectFit='cover' alt='profile pic'/> : <Avatar boxSize={10}/>}
        <Box fontSize="sm" fontWeight="bold">
          {question.interviewer.name}
        </Box>
        <Box fontSize="sm" fontStyle="italic">
          a demandé
        </Box>
      </HStack>
      <Text
        position="relative"
        ref={textRef}
        onClick={() => setExpandBtn(!expandBtn)}
        maxH={!expandBtn && 12}
        overflowY="hidden"
      >
        {question.data}
        {!loading && (
          <>
            {isOverflowed.current && (
              <Button
                variant="link"
                bgColor="#1a202c"
                size="md"
                position="absolute"
                right={0}
                fontWeight="bold"
                fontStyle="italic"
                bottom={0}
                onClick={() => setExpandBtn(!expandBtn)}
              >
                {expandBtn ? "Moins" : "Plus"}
              </Button>
            )}
          </>
        )}
      </Text>
    </Box>
  );
};

export default Question;
