import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // adjust if you're using Tailwind or custom CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/panamount">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
