import "./App.css";
import { ProductListing } from "./components/products";
import { Wishlist } from "./components/wishlist";
import { Cart } from "./components/cart";
import { Nav } from "./components/nav/nav";
import { ProductPage } from "./components/productpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
      <div className="App">
         <div className="header"></div>
         <Router>
            <Nav />
            <Routes>
               <Route path="/" element={<ProductListing />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/productpage/:id" element={<ProductPage />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
