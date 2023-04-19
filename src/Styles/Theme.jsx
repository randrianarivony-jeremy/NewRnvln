import { extendTheme, Flex, Stack } from "@chakra-ui/react";

const config = {
    initialColorMode: 'dark',
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
      darkModeBg: "#1a202c",
      bleu: "#4D9DFF",
      info:'#3182ce',
      transparent: 'transparent',
      vert: "#3AE885",
      violet: "#AF4DFF",
      rouge: "#FF564D",

      gradient:
        "-webkit-linear-gradient(left,#4D9DFF, #3AE885)",
        gradient1:
        "-webkit-linear-gradient(top, #4D9DFF 0%, white 100%)",
        gradient2:
        "-webkit-linear-gradient(top, #3182ce 0%, white 100%)",
        gradient3:
        "-webkit-linear-gradient(top, #3AE885 0%, white 100%)",
        gradient4:
        "-webkit-linear-gradient(top, #AF4DFF 0%, white 100%)",
        gradient5:
        "-webkit-linear-gradient(top, #FF564D 0%, white 100%)",

    },
    components: {
        Button: {
          baseStyle:{
            // _focus:{
            //   all:'null'
            // }
          },
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
            },
            _click:{
              bgColor:'#fff'
            },
            _focus:{
              bgColor:'#fff'
            },
            _focusvisible:{
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