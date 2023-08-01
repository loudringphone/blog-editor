import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import { Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Beforeunload } from "react-beforeunload";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const toastContainerStyle = {
  width: window.innerWidth > 600 ? "auto" : "100%",
};
const toastContainerPosition = window.innerWidth <= 600 ? "bottom-center" : "top-center";

window.addEventListener("resize", () => {
  toastContainerStyle.width = window.innerWidth > 600 ? "auto" : "100%";
});


const handleEditBeforeunload = () => {
  
  return 'Are you sure you want to leave? Changes you made may not be saved.'
}
root.render(
  <React.StrictMode>
    <ToastContainer
      style={toastContainerStyle}
      bodyClassName="toastBody" 
      position={toastContainerPosition}
      hideProgressBar={true}
      autoClose={3500}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      theme="light"
      transition={Slide}
    />
      
      
    <App />

  </React.StrictMode>
);

reportWebVitals();
