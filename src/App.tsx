import AppRoutes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { msalInstance } from "./lib/msal";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <AppRoutes />
        <Toaster position="top-right" />
      </Router>
    </MsalProvider>
  );
}

export default App;
