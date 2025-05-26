import React from 'react';
import { ChakraProvider as BaseChakraProvider, createLocalStorageManager } from '@chakra-ui/react';
import theme from '../theme';

const colorModeManager = createLocalStorageManager('todo-app-color-mode');

type ChakraProps = {
  children: React.ReactNode;
};

export function ChakraProvider({ children }: ChakraProps): JSX.Element {
  return (
    <BaseChakraProvider theme={theme} colorModeManager={colorModeManager} resetCSS>
      {children}
    </BaseChakraProvider>
  );
}
