import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const navigate = useNavigate();
  const responseRef = useRef();
  const [value, setValue] = useState("");
  const [textareaBg, setTextareaBg] = useState("transparent");

  const handleTextChange = ({ currentTarget }) => {
    setValue(currentTarget.value);
  };

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.style.height = "38px";
      const scrollHeight = responseRef.current.scrollHeight;
      if (scrollHeight < 300)
        responseRef.current.style.height = scrollHeight + "px";
      else responseRef.current.style.height = 300 + "px";
    }
  }, [responseRef, value]);

  return (
    <Stack height="100%" paddingBottom={2}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Poser une question</Button>
      </Flex>
      <Stack paddingX={3} justify='space-between' height='100%'>
        
        <ButtonGroup
          variant="float"
          align="center"
          justifyContent="space-around"
        >
          <Button
            border={
              textareaBg === "transparent"
                ? "2px solid black"
                : "1px solid black"
            }
            bg="transparent"
            rounded="full"
            onClick={() => setTextareaBg("transparent")}
          ></Button>
          <Button
            border={textareaBg === "gradient1" && "2px solid black"}
            bg="gradient1"
            rounded="full"
            onClick={() => setTextareaBg("gradient1")}
          ></Button>
          <Button
            border={textareaBg === "gradient2" && "2px solid black"}
            bg="gradient2"
            rounded="full"
            onClick={() => setTextareaBg("gradient2")}
          ></Button>
          <Button
            border={textareaBg === "gradient3" && "2px solid black"}
            bg="gradient3"
            rounded="full"
            onClick={() => setTextareaBg("gradient3")}
          ></Button>
          <Button
            border={textareaBg === "gradient4" && "2px solid black"}
            bg="gradient4"
            rounded="full"
            onClick={() => setTextareaBg("gradient4")}
          ></Button>
          <Button
            border={textareaBg === "gradient5" && "2px solid black"}
            bg="gradient5"
            rounded="full"
            onClick={() => setTextareaBg("gradient5")}
          ></Button>
        </ButtonGroup>
        <Textarea
          bg={textareaBg} rows={1}
          textAlign="center" borderColor='transparent'
          ref={responseRef} _placeholder={{fontSize:'2xl'}}
          placeholder="Appuyez pour écrire"
          value={value}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
          onChange={handleTextChange} border='none'
        ></Textarea>
        <HStack>
          <Button width="100%" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button variant="primary" width="100%" onClick={() => navigate("/")}>
            Poser
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default AskQuestion;
