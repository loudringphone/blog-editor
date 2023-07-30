import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttonTheme';

export const customTheme = extendTheme({
    components: { 
      Button: buttonTheme
    },
  })