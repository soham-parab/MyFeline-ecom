import { ProductListing } from "../src/Pages/Products/products";

import { Cart } from "./Pages/Cart/cart";
import { Nav } from "./components/nav/nav";
import { ProductPage } from "./Pages/Productpage/productpage";
import { Wishlist } from "./Pages/Wishlist/wishlist";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { useAuth } from "./contexts/AuthContext";
import { Router } from "./components/Routes/router";

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <div className="header"></div>
      <Router />
    </div>
  );
}

export default App;
