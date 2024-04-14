import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Si tienes estilos específicos para este archivo
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
