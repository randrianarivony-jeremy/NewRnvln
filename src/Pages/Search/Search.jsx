import { Button, Flex, Input } from '@chakra-ui/react';
import { IonIcon } from '@ionic/react';
import { arrowBack, searchOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { iconMd } from "../../Styles/Theme";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  return (
    <Flex>
      <Button onClick={() => navigate(-1)}>
        <IonIcon icon={arrowBack} />
      </Button>
      <Input
        ref={inputRef}
        placeholder="Rechercher"
        autoFocus
        borderRadius="full"
      />
      <Button
        onClick={() =>
          inputRef.current.value === ""
            ? {}
            : navigate("/search/" + inputRef.current.value)
        }
      >
        <IonIcon icon={searchOutline} style={{ fontSize: iconMd }} />
      </Button>
    </Flex>
  );
};

export default Search;