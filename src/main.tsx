import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { AntdTheme } from "./utils/antd-theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={AntdTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
