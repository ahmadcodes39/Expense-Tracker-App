import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./components/AppContext/UserContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <Toaster position="top-right" />
    <App />
  </UserProvider>
);
