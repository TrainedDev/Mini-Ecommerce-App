import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./State Management/Providers/UserProvider";
import BooleanProvider from "./State Management/Providers/BooleanProvider";
import ThemeProvider from "./State Management/Providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BooleanProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BooleanProvider>
    </UserProvider>
  </StrictMode>,
);
