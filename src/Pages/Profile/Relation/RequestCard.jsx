import { Avatar, Button, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import React from 'react';
import { ClickableFlex } from '../../../Styles/Theme';

const RequestCard = ({user}) => {
    return (
        <ClickableFlex justify="space-between">
                      <Flex>
                        {user.picture ? (
                          <Image
                            src={elt.picture}
                            alt="profilepic"
                            boxSize={12}
                            rounded="full"
                            objectFit="cover"
                          />
                        ) : (
                          <Avatar size="md" />
                        )}
                        <Stack spacing={0} marginLeft={2} justify="center">
                          <Heading size="sm">{user.name}</Heading>
                          {user.job && <Text fontStyle="italic">{user.job}</Text>}
                        </Stack>
                      </Flex>
                      <Button variant='primary'>Confirmer</Button>
                    </ClickableFlex>
    );
};

export default RequestCard;