import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import setupMockServer from "../src/api/mock-server";
import { ProductsProvider } from "./contexts/ProductContext";

setupMockServer();

ReactDOM.render(
   <React.StrictMode>
      <ProductsProvider>
         <App />
      </ProductsProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
