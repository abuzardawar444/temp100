import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

// @ts-ignore
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center'/>   {/*To set the position of the notification*/}
  </StrictMode>
);
