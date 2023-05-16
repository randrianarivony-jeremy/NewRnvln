import { HStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { currentUserContext } from '../../../Controler/App';
import EnableSubscription from './EnableSubscription';
import RelationList from './RelationList';

const RelationBoard = ({user}) => {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    return (
        <HStack justify="space-evenly">
              <RelationList category="Partenaires" userId={user._id} length={user.friends.length}/>
              {user._id===currentUser._id && <RelationList category="Demandes" userId={user._id} length={user.friendRequest.length}/>}
              {user.subscription ? (
                <>
                  <RelationList category="Abonnés" userId={user._id} length={user.subscribers.length}/>
                  <RelationList
                    category="Abonnements"
                    userId={user._id} length={user.subscriptions.length}/>
                </>
              ) : (user._id===currentUser._id &&
                <EnableSubscription />
              )}
            </HStack>
    );
};

export default RelationBoard;