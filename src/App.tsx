import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Editor from './components/Editor';
import { customTheme } from './styles/customTheme';
import './App.css';

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
    <div className="App">
      <Editor />
    </div>
    </ChakraProvider>
  );
}

export default App;
