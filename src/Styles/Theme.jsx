import { extendTheme, Flex, Stack } from "@chakra-ui/react";

const config = {
    initialColorMode: 'light',
  }
  
  
export  const theme = extendTheme({
    config,
    colors: {
      dark: {
        100: "#1E1E1E",
        50: "#282828",
        0: "#323232",
      },
      light:{
        100: "#d2d3db",
        50: "#e4e5f1",
        0: "#fafafa",
      },
      bleu: "#4D9DFF",
      info:'#3182ce',
      transparent: 'transparent',
      vert: "#3AE885",
      violet: "#AF4DFF",
      rouge: "#FF564D",

      gradient:
        "-webkit-linear-gradient(left, rgba(77, 157, 255, 1)0%, rgba(58, 232, 133, 1)100%)",
        gradient1:
        "-webkit-linear-gradient(top, rgba(77, 157, 255, 1)0%, rgba(255, 255, 255, 1)100%)",
        gradient2:
        "-webkit-linear-gradient(top, rgba(58, 232, 133, 1)0%, rgba(255, 255, 255, 1)100%)",
        gradient3:
        "-webkit-linear-gradient(top, rgba(255, 86, 77, 1)0%, rgba(255, 255, 255, 1)100%)",
        gradient4:
        "-webkit-linear-gradient(top, rgba(175, 77, 255, 1)0%, rgba(255, 255, 255, 1)100%)",
        gradient5:
        "-webkit-linear-gradient(top, rgba(246, 255, 77, 1)0%, rgba(255, 255, 255, 1)100%)",

    },
    components: {
        Button: {
          variants: {
            'cta': {
              bg: 'gradient',
              color:'black',
              borderRadius:'full',
              _hover:{
                bg:'whiteAlpha.200'
              },
            },
            'primary': {
              bg: 'bleu',
              color:'white',
              _hover:{
                bg:'whiteAlpha.200'
              },
            },
            'float': {
              bg: 'transparent',
              boxSize:'40px',
              borderRadius:'5px',
              _hover:{
                bg:'whiteAlpha.200'
              },
            },
          },
          defaultProps: {
            variant:'ghost',
            _active:{
              bgColor:'#fff'
            }
          },
        },
        Badge:{
          baseStyle:{
            textAlign:'center',
            boxSize:'20px',
            bg:'red',
            rounded:'full',
          }
        },
      }
  });

  export const noScrollbar={
    "::WebkitScrollbar": {
      display: "none",
    },
  }

export const ClickableFlex = (BoxProps) => (
  <Flex cursor='pointer' fontSize='sm' align='center' _hover={{bg:'whiteAlpha.200'}} rounded='lg' paddingX={3} paddingY={2} {...BoxProps} />
)

export const Scroll = (BoxProps) => (
  <Stack
  overflowY="scroll" spacing={0}
  sx={{ "::-webkit-scrollbar": { display: "none" } }} {...BoxProps} />
)