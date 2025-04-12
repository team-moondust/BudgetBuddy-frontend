import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { StrictMode } from "react";
import "./reset.css";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
