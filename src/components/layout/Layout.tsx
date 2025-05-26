import { Box, Container } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container
        maxW="1000px"
        maxH="1000px"
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={8}
        position="relative"
        overflow="hidden"
      >
        <Box fontSize="6xl" color="pink.100" mb={8} textAlign="center">
          todos
        </Box>
        <Box maxW="100%" overflow="auto" h="calc(100% - 120px)">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
