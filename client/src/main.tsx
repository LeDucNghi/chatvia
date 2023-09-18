import "./assets/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
        <CssBaseline />
        <ToastContainer />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
