/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const app = (
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


ReactDOM.render(app, document.getElementById("root"));
