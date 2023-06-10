import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserItem from "../../Component/UserItem";
import { useLazySearchUserQuery } from "../../Controler/Redux/Features/userSlice";

const NewMessage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [searchUser, { data, isFetching }] = useLazySearchUserQuery();

  return (
    <Stack>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button variant="float" onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
        </Button>
        <Button>Nouveau message</Button>
      </Flex>
      <InputGroup>
        <Input
          type="text"
          ref={inputRef}
          placeholder="Entrer un nom"
          onChange={(e) =>
            searchUser(e.target.value, { preferCacheValue: true })
          }
        />
        {isFetching && (
          <InputRightElement>
            <Spinner />
          </InputRightElement>
        )}
      </InputGroup>
      {data !== undefined &&
        (data.length > 0 ? (
          <Stack>
            {data.map((user) => (
              <Flex
                key={user._id}
                onClick={() => {
                  navigate("/chat/" + user._id);
                }}
              >
                <UserItem user={user} />
              </Flex>
            ))}
          </Stack>
        ) : (
          <Text paddingX={3}>
            Aucun résultat pour "{inputRef.current.value}"
          </Text>
        ))}
    </Stack>
  );
};

export default NewMessage;
