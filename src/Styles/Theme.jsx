import { extendTheme, Flex, Stack } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: "dark",
};

export const theme = extendTheme({
  styles: {
    global: (props)=>({
      // styles for the `body`
      'body,html': {
        fontFamily:'Nunito Sans,body,Arial',
        bg: mode('whiteAlpha.50', 'dark.0')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props)
      },
    }),
  },
  config,
  colors: {
    dark: {
      100: "#1E1E1E",
      50: "#181818",
      0: "#121212",
    },
    light: {
      100: "#d2d3db",
      50: "#e4e5f1",
      0: "#fafafa",
    },
    darkModeBg: "#1a202c",
    bleu: "#4D9DFF",
    info: "#3182ce",
    transparent: "transparent",
    vert: "#3AE885",
    violet: "#AF4DFF",
    rouge: "#FF564D",

    gradient: "-webkit-linear-gradient(left,#4D9DFF, #3AE885)",
    gradient1: "-webkit-linear-gradient(bottom right, #56ab2f, #a8e063)", //lush 2000
    // gradient1: "-webkit-linear-gradient(right, #a8c0ff, #3f2b96)", //slight ocean view
    gradient2: "-webkit-linear-gradient(right, #fdc830, #f37335)", //citrus peel
    gradient3: "-webkit-linear-gradient(right, #FF512F, #DD2476)", //bloody mary
    gradient4: "-webkit-linear-gradient(top, #FFAE00, #F9E866)", //tropical juice
    gradient5: "-webkit-linear-gradient(right, #ad5389, #3c1053)", //expresso
    gradient6: "-webkit-linear-gradient(right, #4e54c8, #8f94fb)", //moon purple
    gradient7: "-webkit-linear-gradient(top left, #36D1DC, #5B86E5)",//scooter 100
    // gradient7: "-webkit-linear-gradient(right, #ff9966, #ff5e62)",//orange coral
    gradient8: "-webkit-linear-gradient(right, #ff416c, #ff4b2b)",//burning orange
    gradient9: "-webkit-linear-gradient(bottom right, #00416a, #799f0c, #ffe000)",//combi
    gradient10: "-webkit-linear-gradient(right, #1488CC, #2B32B2)",//skyline
  },
  components: {
    Button: {
      baseStyle:{
        textOverflow:'ellipsis'
      },
      variants: {
        cta: (props)=>({
          bg: "gradient",
          color: "black",
          borderRadius: "full",
          _hover: {
            bg: mode('gray.100', 'whiteAlpha.200')(props),
          },
        }),
        primary: {
          bg: "bleu",
          color: "white",
          _hover: {
            bg:'whiteAlpha.200'
          },
        },
        dissuasive: {
          bg: "#db3030",
          color: "white",
          _hover: {
            bg:'whiteAlpha.200'
          },
        },
        float: (props)=>({
          bg: "transparent",
          paddingX:0,
          fontSize:'2xl',
          boxSize: "40px",
          borderRadius: "5px",
          _hover: {
            bg: mode('gray.100', 'whiteAlpha.200')(props),
          },
        }),
        ghost:{
          _active:{
            bgColor:'initial'
          }
        },
        outline:{
          _active:{
            bgColor:'initial'
          }
        },
        solid:{
          _active:{
            bgColor:'initial'
          }
        },
        link:{
          height:'20px',
          _active:{
            bgColor:'initial'
          }
        }
      },
      defaultProps: {
        variant: "ghost",
      },
    },
    Badge: {
      baseStyle: {
        textAlign: "center",
        boxSize: "20px",
        bg: "red",
        rounded: "full",
      },
    },
  },
});

export const iconSm = "16px";
export const iconMd = "24px";
export const iconLg = "32px";
export const iconXl = "36px";
