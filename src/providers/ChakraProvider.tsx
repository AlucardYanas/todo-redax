import { ChakraProvider as BaseChakraProvider } from '@chakra-ui/react';
import React from 'react';

type ChakraProps = {
  children: React.ReactNode;
};

export function ChakraProvider({ children }: ChakraProps): JSX.Element {
  return <BaseChakraProvider resetCSS>{children}</BaseChakraProvider>;
}
