import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
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
