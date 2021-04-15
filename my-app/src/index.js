import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import setupMockServer from "../src/api/mock-server";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductsContext";
import { WishlistProvider } from "./contexts/WishlistContext";

setupMockServer();

ReactDOM.render(
   <React.StrictMode>
      <ProductProvider>
         <CartProvider>
            <WishlistProvider>
               <App />
            </WishlistProvider>
         </CartProvider>
      </ProductProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
