import "./App.css";
import { ProductListing } from "./components/products";
import { Wishlist } from "./components/wishlist";
import { Cart } from "./components/cart";
import { useState } from "react";
import { Nav } from "./components/nav/nav";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   useNavigate,
   useParams,
   useLocation,
} from "react-router-dom";

function App() {
   const [route, setRoute] = useState("products");
   return (
      <div className="App">
         <div className="header">
            
         </div>
       

         <Router>
         <Nav />
            <Routes>
               <Route path="/" element={<ProductListing />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
         </Router>

         {/* <button className="button" onClick={() => setRoute("products")}>
            Show Products
         </button>
         <button className="button" onClick={() => setRoute("cart")}>
            {" "}
            My Cart{" "}
         </button>
         <button className="button" onClick={() => setRoute("wishlist")}>
            {" "}
            My Wishlist{" "}
         </button>

         {route === "products" && <ProductListing />}
         {route === "cart" && <Cart />}
         {route === "wishlist" && <Wishlist />} */}
      </div>
   );
}

export default App;
