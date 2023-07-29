import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttonTheme';

// export const customTheme = extendTheme({
//     colors: {
//         brand: {
//             500: '#0b5d51',
//         }
//     }
// });
 
export const customTheme = extendTheme({
    components: { 
      Button: buttonTheme
    },
  })