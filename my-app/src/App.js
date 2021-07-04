import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ProductListing } from "../src/Pages/Products/products";
import "./App.css";
import { Cart } from "./Pages/Cart/cart";
import { Nav } from "./components/nav/nav";
import { ProductPage } from "./Pages/Productpage/productpage";
import { Wishlist } from "./Pages/Wishlist/wishlist";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { auth } = useAuth();
  // const { navigate } = useNavigate();

  // function PrivateRoute({ path, ...props }) {
  //   console.log(path, props, "llllllll");
  //   return auth ? (
  //     <Route {...props} path={path} />
  //   ) : (
  //     <Navigate state={{ from: path }} replace to="/login" />
  //   );
  // }
  return (
    <div className="App">
      <div className="header"></div>

      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductListing />} />
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
