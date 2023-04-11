import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import {BrowserRouter,Route,Routes as ROUTES,
} from "react-router-dom";

const Home = lazy(()=> import("../Pages/Home/Home"));
const Login = lazy(()=>import("../Pages/Login/Login"));
const Notification = lazy(()=>import("../Pages/Notification/Notification"));
const Profile = lazy(()=>import("../Pages/Profile/Profile"));
const UserProfile = lazy(()=>import("../Pages/Profile/UserProfile"));
const Message = lazy(()=>import("../Pages/Message/Message"));
const Chat = lazy(()=>import("../Pages/Message/Chat"));
const PublicationOptions = lazy(()=>import("../Pages/Publication/PublicationOptions"));
const PublishImage = lazy(()=>import("../Pages/Publication/PublishImage"));
const PublishText = lazy(()=>import("../Pages/Publication/PublishText"));
const AskQuestion = lazy(()=>import("../Pages/Publication/AskQuestion"));
const Parameter = lazy(()=>import("../Pages/Parameter/Parameter"));
const Search = lazy(()=>import("../Pages/Search/Search"));
const SearchResult = lazy(()=>import("../Pages/Search/SearchResult"));

const Loader=()=>{
  return <Flex justify='center' alignItems='center' height='100%'>
    <Spinner/>
  </Flex>
}

const Routes = () => {
  return (
      <Box height='100%'>
          <BrowserRouter>
            <ROUTES>
                <Route path="/" element={<Suspense fallback={<Loader/>}><Home /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
                <Route path="/message" element={<Suspense fallback={<Loader/>}><Message/></Suspense>} />
                <Route path="/chat" element={<Suspense fallback={<Loader/>}><Chat/></Suspense>} />
                <Route path="/notification" element={<Suspense fallback={<Loader/>}><Notification /></Suspense>} />
                <Route path="/profile" element={<Suspense fallback={<Loader/>}><Profile /></Suspense>} />
                <Route path="/profile/:id" element={<Suspense fallback={<Loader/>}><UserProfile /></Suspense>} />
                <Route path="/publication" element={<Suspense fallback={<Loader/>}><PublicationOptions /></Suspense>} />
                <Route path="/publication/image" element={<Suspense fallback={<Loader/>}><PublishImage /></Suspense>} />
                <Route path="/publication/text" element={<Suspense fallback={<Loader/>}><PublishText /></Suspense>} />
                <Route path="/question" element={<Suspense fallback={<Loader/>}><AskQuestion /></Suspense>} />
                <Route path="/parameters" element={<Suspense fallback={<Loader/>}><Parameter /></Suspense>} />
                <Route path="/search" element={<Suspense fallback={<Loader/>}><Search /></Suspense>} />
                <Route path="/search/:keyword" element={<Suspense fallback={<Loader/>}><SearchResult /></Suspense>} />
            </ROUTES>
          </BrowserRouter>
        </Box>
  );
};

export default Routes;
