import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { iconMd } from "../Styles/Theme";

const SearchBtn = () => {
  const navigate = useNavigate();
  const searchSubmit = useRef(false);
  const [searchParams] = useSearchParams();
  const defaultIndex = searchParams.get("default_index") ?? 0;
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  return (
    <InputGroup
      position="absolute"
      zIndex={3}
      right={1}
      top={1}
      display="block"
      width={"calc(100% - 52px)"}
    >
      <Input
        ref={inputRef}
        width={0}
        type="text"
        float="right"
        border={"none"}
        transition={"width .7s ease-out"}
        onBlur={() => {
          setTimeout(() => {
            searchSubmit.current = false;
          }, 1000);
        }}
        onFocus={() => (searchSubmit.current = true)}
        _focus={{ width: "100%", bgColor: bg }}
      />
      <InputRightElement
        onClick={() =>
          !searchSubmit.current
            ? inputRef.current.focus()
            : inputRef.current.value.length > 0 &&
              navigate(
                "/search?keyword=" +
                  inputRef.current.value +
                  "&default_index=" +
                  defaultIndex
              )
        }
        cursor="pointer"
      >
        <IonIcon icon={searchOutline} style={{ fontSize: iconMd }} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBtn;
