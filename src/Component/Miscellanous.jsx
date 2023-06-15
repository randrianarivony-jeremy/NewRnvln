import { Flex, Spinner, Text } from "@chakra-ui/react";

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
