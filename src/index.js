import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import theme from "./theme.json";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </>
);
