import { Box } from "@chakra-ui/react";
import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Route, Routes as ROUTES } from "react-router-dom";
import { Loader } from "../Component/Miscellanous";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import { currentUserContext } from "./App";

const SinglePost = lazy(() => import("../Pages/StandalonePost/SinglePost"));
const Notification = lazy(() => import("../Pages/Notification/Notification"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));
const UserProfile = lazy(() => import("../Pages/Profile/UserProfile"));
const Message = lazy(() => import("../Pages/Message/Message"));
const NewMessage = lazy(() => import("../Pages/Message/NewMessage"));
const Chat = lazy(() => import("../Pages/Chat/Chat"));
const Publication = lazy(() => import("../Pages/Publication/Publication"));
const Interview = lazy(() =>
  import("../Pages/Publication/Interview/Interview")
);
const PublishMedia = lazy(() =>
  import("../Pages/Publication/Article/PublishMedia")
);
const PublishText = lazy(() =>
  import("../Pages/Publication/Article/PublishText")
);
const Question = lazy(() => import("../Pages/Question/Question"));
const QuestionItem = lazy(() => import("../Pages/Question/QuestionItem"));
const QuestionInterviews = lazy(() =>
  import("../Pages/Question/QuestionInterviews")
);
const Parameter = lazy(() => import("../Pages/Parameter/Parameter"));
const Search = lazy(() => import("../Pages/Search/Search"));
const About = lazy(() => import("../Component/About"));

const Routes = () => {
  const { currentUser } = useContext(currentUserContext);
  return (
    <Box height="100%" className="route" width="100%">
      <BrowserRouter>
        {/* prettier-ignore  */}
        <ROUTES>
          <Route 
            path="/" 
            element={currentUser ? <Home /> : <Login />}
          />
          <Route 
            path="/about" 
            element={<Suspense fallback={<Loader />}>{<About />}</Suspense>}
          />
          <Route
            path="/post/:type/:id"
            element={<Suspense fallback={<Loader />}>{currentUser ? <SinglePost /> : <Login />}</Suspense>}
          />
          <Route
            path="/login"
            element={<Suspense fallback={<Loader />}><Login /></Suspense>}
          />
          <Route
            path="/message"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Message /> : <Login />}</Suspense>}
          />
          <Route
            path="/message/new"
            element={<Suspense fallback={<Loader />}>{currentUser ? <NewMessage /> : <Login />}</Suspense>}
          />
          <Route
            path="/chat/:userId"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Chat /> : <Login />}</Suspense>}
          />
          <Route
            path="/notification"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Notification /> : <Login />}</Suspense>}
          />
          <Route
            path="/profile"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Profile /> : <Login />}</Suspense>}
          />
          <Route
            path="/profile/:userId"
            element={<Suspense fallback={<Loader />}>{currentUser ? <UserProfile /> : <Login />}</Suspense>}
          />
          <Route
            path="/publication"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Publication /> : <Login />}</Suspense>}
          />
          <Route
            path="/interview/:questionId"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Interview /> : <Login />}</Suspense>}
          />
          <Route
            path="/publication/media"
            element={<Suspense fallback={<Loader />}>{currentUser ? <PublishMedia /> : <Login />}</Suspense>}
          />
          <Route
            path="/publication/text"
            element={<Suspense fallback={<Loader />}>{currentUser ? <PublishText /> : <Login />}</Suspense>}
          />
          <Route
            path="/question/interviews/:questionId"
            element={<Suspense fallback={<Loader />}>{currentUser ? <QuestionInterviews /> : <Login />}</Suspense>}
          />
          <Route
            path="/question/:questionId"
            element={<Suspense fallback={<Loader />}>{currentUser ? <QuestionItem /> : <Login />}</Suspense>}
          />
          <Route
            path="/question"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Question /> : <Login />}</Suspense>}
          />
          <Route
            path="/parameters"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Parameter /> : <Login />}</Suspense>}
          />
          <Route
            path="/search"
            element={<Suspense fallback={<Loader />}>{currentUser ? <Search /> : <Login />}</Suspense>}
          />
        </ROUTES>
      </BrowserRouter>
    </Box>
  );
};

export default Routes;
