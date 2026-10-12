import React from "react";
import { createRoot } from "react-dom/client";
import LoginApp from "../app/login-app";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><LoginApp/></React.StrictMode>,
);
