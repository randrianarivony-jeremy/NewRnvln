import { Flex, Textarea } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from "react";
import textFit from "textfit";
import { questionContext } from "./Question";

const InputCard = ({ index }) => {
  const { questionsArray, writing, setWriting, textareaRef, handleChange } =
    useContext(questionContext);
  const textRef = useRef();

  useEffect(() => {
    if (!writing[index])
      textFit(textRef.current, {
        minFontSize: 16,
        maxFontSize: 24,
      });
  }, [writing, questionsArray]);
  return (
    <>
      {writing[index] ? (
        <Textarea
          margin={"auto"}
          ref={textareaRef}
          autoFocus={true}
          placeholder="Ecrire quelque chose"
          maxLength={320}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
          onBlur={handleChange}
          defaultValue={
            questionsArray[index] !== "Ecrire quelque chose"
              ? questionsArray[index]
              : null
          }
        ></Textarea>
      ) : (
        <Flex
          justify={"center"}
          align="center"
          textAlign={"center"}
          ref={textRef}
          width={"100%"}
          height="100%"
          onClick={() =>
            setWriting((current) => {
              let mirror = [...current];
              mirror[index] = true;
              return mirror;
            })
          }
          fontStyle={
            questionsArray[index] === "Ecrire quelque chose"
              ? "italic"
              : "normal"
          }
          opacity={questionsArray[index] === "Ecrire quelque chose" ? 0.5 : 1}
        >
          {questionsArray[index] ?? "Ecrire quelque chose"}
        </Flex>
      )}
    </>
  );
};

export default InputCard;