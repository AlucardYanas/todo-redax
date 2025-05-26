import { Box, Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box minH="100vh" py={8} bg="gray.50">
      <Container maxW="container.md">{children}</Container>
    </Box>
  );
};

export default Layout;
