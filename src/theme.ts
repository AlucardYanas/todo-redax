import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.50',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '1000px',
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'xl',
        p: 8,
        position: 'relative',
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
      defaultProps: {
        colorScheme: 'pink',
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'green',
        size: 'lg',
      },
    },
    Text: {
      variants: {
        title: {
          fontSize: '6xl',
          color: 'pink.100',
          mb: 8,
          textAlign: 'center',
        },
        cardTitle: {
          fontSize: 'lg',
          isTruncated: true,
        },
        cardDescription: {
          fontSize: 'sm',
          color: 'gray.500',
          isTruncated: true,
        },
      },
    },
  },
});

export default theme;
