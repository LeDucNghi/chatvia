import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/main.scss";
import "./assets/styles/general.scss";

import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
      <CssBaseline />
      <ToastContainer />
    </Provider>
  </HelmetProvider>
);
