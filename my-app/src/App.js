import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductListing } from "../src/Pages/Products/products";
import "./App.css";
import { Cart } from "./components/cart";
import { Nav } from "./components/nav/nav";
import { ProductPage } from "./components/productpage";
import { Wishlist } from "./components/wishlist";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/products" element={<ProductListing />} />
          <Route path="/" element={<Homepage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
