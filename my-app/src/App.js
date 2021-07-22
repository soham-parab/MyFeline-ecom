import { ProductListing } from "../src/Pages/Products/products";

import { Cart } from "./Pages/Cart/cart";
import { Nav } from "./components/nav/nav";
import { ProductPage } from "./Pages/Productpage/productpage";
import { Wishlist } from "./Pages/Wishlist/wishlist";

import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "./contexts/toastContext";
import { Router } from "./components/Routes/router";

function App() {
  const { ToastContainer } = useToast();
  console.log(ToastContainer);
  return (
    <div className="App">
      <div className="header"></div>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
