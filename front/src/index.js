import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./i18n";

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.style.setProperty("--main-bg", "#171717");
  document.documentElement.style.setProperty("--second-bg", "#000000");
  document.documentElement.style.setProperty("--main-font", "#ffffff");
  document.documentElement.style.setProperty("--main-link", "#0453ff");
}
if (localStorage.getItem("theme") === "light") {
  document.documentElement.style.setProperty("--main-bg", "#ebf5ff");
  document.documentElement.style.setProperty("--second-bg", "#ffffff");
  document.documentElement.style.setProperty("--main-font", "#000000");
  document.documentElement.style.setProperty("--main-link", "#0453ff");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
