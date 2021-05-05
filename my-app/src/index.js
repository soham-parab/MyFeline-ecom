import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./contexts/ProductContext";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   useNavigate,
   useParams,
   useLocation,
} from "react-router-dom";

// setupMockServer();

ReactDOM.render(
   <React.StrictMode>
      <ProductsProvider>
         <App />
      </ProductsProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
