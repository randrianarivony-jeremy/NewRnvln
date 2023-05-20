import { Box, Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { chatbubblesOutline } from "ionicons/icons";
import React, { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { iconMd } from "../../Styles/Theme";
import Post from "./Post";
import QuestionSlider from "./QuestionSlider";
import Reaction from "./Reaction/Reaction";

export const postContext = createContext();
export const dataContext = createContext();

const PostContainer = ({ post }) => {
  const [showReaction, setShowReaction] = useState(true);
  const postSwiper = useRef();
  const containerRef = useRef();
  const navigate = useNavigate();

  return (
    <postContext.Provider
      value={{
        post,
        showReaction,
        setShowReaction,
        postSwiper,
        containerRef,
      }}
    >
      <Swiper
        mousewheel={{enabled:true,forceToAxis:true}}
        modules={[Pagination,Mousewheel]}
        pagination={{ type: "progressbar" }}>
        {post.data.map((data, index) => (
          <SwiperSlide key={index}>
            <dataContext.Provider
              value={{
                data,index
              }}
            >
              <Post />

              {/* Q U E S T I O N  F O R  M E D I A  T Y P E */}
              {post.type === "interview" &&
                data.contentType !== "short" &&
                data.contentType !== "text" && (
                  <Box
                    position="absolute"
                    left={0}
                    bottom={14}
                    zIndex={2}
                    width={showReaction ? "calc(100% - 50px)" : "100%"}
                  >
                    <QuestionSlider question={post.question} index={index} />
                  </Box>
                )}
            </dataContext.Provider>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* R E A C T I O N              */}
      <Reaction />

      {post.type === "interview" && (
        <Flex
          position="absolute"
          bottom={2}
          left={0}
          zIndex={2}
        >
          <Button
            marginLeft={3}
            variant="cta"
            width="min-content"
            leftIcon={
              <IonIcon style={{ fontSize: iconMd }} icon={chatbubblesOutline} />
            }
            onClick={() => navigate("/interview/" + post.question._id)}
          >
            Répondre
          </Button>
        </Flex>
      )}
    </postContext.Provider>
  );
};

export default PostContainer;
