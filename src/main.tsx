import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { ConfigProvider } from "antd";
import { store } from "./redux/store.ts";
import { createRoot } from "react-dom/client";
import { AntdTheme } from "./utils/antd-theme.ts";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={AntdTheme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ConfigProvider>
  </StrictMode>
);
