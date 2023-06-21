import { Flex, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorRender = ({ isError, error }) => {
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (isError && error.status === 403) {
      toast({
        title: "Expiration",
        description:
          "Vous avez atteint un mois de connexion. Veillez vous reconnecter",
        status: "info",
        position: "bottom",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, [isError]);
  return (
    <p>
      Une erreur est survenue lors du chargement. Veuillez réessayer plus tard.
    </p>
  );
};

export const Loader = () => {
  return (
    <Flex justify="center" alignItems="center" height="100%">
      <Spinner />
    </Flex>
  );
};

export const EmptyState = () => {
  return (
    <Flex justify="center" alignItems="center" height="100%">
      <Text>Aucun résultat</Text>
    </Flex>
  );
};

export const ClickableFlex = (BoxProps) => (
  <Flex
    cursor="pointer"
    fontSize="sm"
    align="center"
    _hover={{ bg: "whiteAlpha.200" }}
    rounded="lg"
    paddingX={3}
    paddingY={2}
    {...BoxProps}
  />
);

export const Scroll = (BoxProps) => (
  <Stack
    overflowY="scroll"
    spacing={0}
    sx={{ "::-webkit-scrollbar": { display: "none" } }}
    {...BoxProps}
  />
);
