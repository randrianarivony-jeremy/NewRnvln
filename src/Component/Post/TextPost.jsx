import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scroll } from "../../Styles/Theme";
import Question from "../Question";
import { postContext } from "./PostContainer";

const TextPost = () => {
  const { post } = useContext(postContext);
  return (
    // <Box marginX={3}>
    //   {post.type === 'interview' && <Question question={post.question} />}
    //   <Text textAlign='left'>{post.content}</Text>
    // </Box>
    <Swiper
        direction={"vertical"}
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={true}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className="mySwiper" height='100%' width='100%' style={{border:'1px solid red'}}
      >
        <SwiperSlide>
          <h4>Scroll Container</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus,
            ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet
            dolor lectus eu libero. Vestibulum venenatis eget turpis sed
            faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam
            elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean
            tristique nisl tellus, sit amet fringilla nisl volutpat cursus.
            Quisque dignissim lectus ac nunc consectetur mattis. Proin vel
            hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et
            tincidunt tristique, nisl risus facilisis lectus, ut interdum orci
            nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit
            sodales posuere eget non est. Fusce convallis vestibulum dolor non
            volutpat. Vivamus vestibulum quam ut ultricies pretium.
          </p>
          <p>
            Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna
            consectetur convallis non vel mi. Donec libero dolor, volutpat ut
            urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel
            scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis
            ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque
            iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus,
            sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare
            nunc vel tellus facilisis, quis dictum elit tincidunt. Donec
            accumsan nisi at laoreet sodales. Cras at ullamcorper massa.
            Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.
          </p>
          <p>
            Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat
            elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit.
            Integer tincidunt finibus metus vel porta. Mauris sed mauris congue,
            pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu
            et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium
            tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.
          </p>
          <p>
            Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi
            id tempor vulputate, nisi justo cursus justo, pellentesque
            condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. In placerat
            tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis
            et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet
            pellentesque orci aliquam. Vestibulum elementum posuere vehicula.
          </p>
          </SwiperSlide>
          </Swiper>
  );
};

export default TextPost;
