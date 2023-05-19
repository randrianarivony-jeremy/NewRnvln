import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { lazy, Suspense, useContext } from "react";
import {BrowserRouter,Route,Routes as ROUTES,
} from "react-router-dom";
import Home from '../Pages/Home/Home'
import { currentUserContext } from "./App";

const PostCard = lazy(()=> import("../Pages/StandalonePost/PostCard"));
const ForYouPage = lazy(()=> import("../Pages/Home/ForYouPage"));
const SubscriptionOnly = lazy(()=> import("../Pages/Home/SubscriptionOnly"));
const Login = lazy(()=>import("../Pages/Login/Login"));
const Notification = lazy(()=>import("../Pages/Notification/Notification"));
const Profile = lazy(()=>import("../Pages/Profile/Profile"));
const UserProfile = lazy(()=>import("../Pages/Profile/UserProfile"));
const Message = lazy(()=>import("../Pages/Message/Message"));
const Chat = lazy(()=>import("../Pages/Chat/Chat"));
const Publication = lazy(()=>import("../Pages/Publication/Article/Publication"));
const Interview = lazy(()=>import("../Pages/Publication/Interview/Interview"));
const PublishMedia = lazy(()=>import("../Pages/Publication/Article/PublishMedia"));
const PublishText = lazy(()=>import("../Pages/Publication/Article/PublishText"));
const AskQuestion = lazy(()=>import("../Pages/Question/AskQuestion"));
const Question = lazy(()=>import("../Pages/Question/Question"));
const Parameter = lazy(()=>import("../Pages/Parameter/Parameter"));
const Search = lazy(()=>import("../Pages/Search/Search"));
const SearchResult = lazy(()=>import("../Pages/Search/SearchResult"));

export const Loader=()=>{
  return <Flex justify='center' alignItems='center' height='100%'>
    <Spinner/>
  </Flex>
}

const Routes = () => {
  const {currentUser}=useContext(currentUserContext);
  return (
      <Box height='100%' className="route" width='100%'>
          <BrowserRouter>
            <ROUTES>
                <Route path="/" element={currentUser ? <Home /> : <Login/>} >
                <Route index element={<Suspense fallback={<Loader/>}>{currentUser ? <ForYouPage /> : <Login/>}</Suspense>} />
                <Route path="/subscriptions_only" element={<Suspense fallback={<Loader/>}>{currentUser ? <SubscriptionOnly /> : <Login/>}</Suspense>} />
                <Route path="/questions_only" element={<Suspense fallback={<Loader/>}>{currentUser ? <PostCard /> : <Login/>}</Suspense>} />
                </Route>
                <Route path="/post/:id" element={<Suspense fallback={<Loader/>}>{currentUser ? <PostCard /> : <Login/>}</Suspense>} />
                <Route path="/login" element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
                <Route path="/message" element={<Suspense fallback={<Loader/>}>{currentUser ? <Message /> : <Login/>}</Suspense>} />
                <Route path="/chat/:userId" element={<Suspense fallback={<Loader/>}>{currentUser ? <Chat /> : <Login/>}</Suspense>} />
                <Route path="/notification" element={<Suspense fallback={<Loader/>}>{currentUser ? <Notification /> : <Login/>}</Suspense>} />
                <Route path="/profile" element={<Suspense fallback={<Loader/>}>{currentUser ? <Profile /> : <Login/>}</Suspense>} />
                <Route path="/profile/:userId" element={<Suspense fallback={<Loader/>}>{currentUser ? <UserProfile /> : <Login/>}</Suspense>} />
                <Route path="/publication" element={<Suspense fallback={<Loader/>}>{currentUser ? <Publication /> : <Login/>}</Suspense>} />
                <Route path="/interview/:questionId" element={<Suspense fallback={<Loader/>}>{currentUser ? <Interview /> : <Login/>}</Suspense>} />
                <Route path="/publication/media" element={<Suspense fallback={<Loader/>}>{currentUser ? <PublishMedia /> : <Login/>}</Suspense>} />
                <Route path="/publication/text" element={<Suspense fallback={<Loader/>}>{currentUser ? <PublishText /> : <Login/>}</Suspense>} />
                <Route path="/question" element={<Suspense fallback={<Loader/>}>{currentUser ? <Question /> : <Login/>}</Suspense>} />
                <Route path="/single_question" element={<Suspense fallback={<Loader/>}>{currentUser ? <AskQuestion /> : <Login/>}</Suspense>} />
                <Route path="/parameters" element={<Suspense fallback={<Loader/>}>{currentUser ? <Parameter /> : <Login/>}</Suspense>} />
                <Route path="/search" element={<Suspense fallback={<Loader/>}>{currentUser ? <Search /> : <Login/>}</Suspense>} />
                <Route path="/search/:keyword" element={<Suspense fallback={<Loader/>}>{currentUser ? <SearchResult /> : <Login/>}</Suspense>} />
            </ROUTES>
          </BrowserRouter>
        </Box>
  );
};

export default Routes;
