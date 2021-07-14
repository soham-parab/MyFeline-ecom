import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { Nav } from "../nav/nav";
import { ProductPage } from "../../Pages/Productpage/productpage";
import { Cart } from "../../Pages/Cart/cart";
import { Wishlist } from "../../Pages/Wishlist/wishlist";
import { Login } from "../../Pages/Login/Login";
import { Register } from "../../Pages/Register/Register";
import { useAuth } from "../../contexts/AuthContext";
import { ProductListing } from "../../Pages/Products/products";
import { Homepage } from "../../Pages/Homepage/Homepage";

export function Router() {
  const { auth } = useAuth();

  function PrivateRoute({ path, ...props }) {
    console.log(path, props, "llllllll");
    return auth ? (
      <Route {...props} path={path} />
    ) : (
      <Navigate state={{ from: path }} replace to="/login" />
    );
  }

  return (
    <>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}
