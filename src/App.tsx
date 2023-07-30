import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Editor from './components/editor/Editor';
import { customTheme } from './components/editor/customTheme';
import './App.css';
import { Layout } from './layout/Layout';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <BrowserRouter>
        <div className="App">
        <Layout />
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
