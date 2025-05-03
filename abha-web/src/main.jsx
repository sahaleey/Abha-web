import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import the ScrollToTop component

// Create a wrapper component that handles scroll restoration
const RouterWrapper = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* This will handle scroll to top on navigation */}
      <App />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterWrapper />
  </StrictMode>
);
