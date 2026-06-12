import React from "react";
import ReactDOM from "react-dom/client";
import "../app/globals.css";
import ClientApp from "../components/ClientApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClientApp />
  </React.StrictMode>,
);
