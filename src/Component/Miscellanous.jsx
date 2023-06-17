import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";

export const ErrorRender = () => {
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
