import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Publication = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Créer une publication</Button>
      </Flex>
    </div>
  );
};

export default Publication;
