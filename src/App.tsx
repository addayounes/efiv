import AppRoutes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
