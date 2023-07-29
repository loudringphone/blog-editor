import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Editor from './components/Editor';
import { customTheme } from './styles/customTheme';
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
