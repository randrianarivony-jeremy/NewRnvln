import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';

const BackgroundOptions = ({textareaBg, setTextareaBg}) => {
    return (
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
    );
};

export default BackgroundOptions;