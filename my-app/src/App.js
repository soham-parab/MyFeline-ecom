import "./App.css";
import { ProductListing } from "./components/products";
import {Wishlist} from "./components/wishlist"
import {Cart} from "./components/cart"
import {useState} from "react"

function App() {
  const [route,setRoute] = useState("products")
   return (
      <div className="App">
         <div className="header">
            <h1 className="h1"> MyFeline </h1>
         </div>

         <button className = "button" onClick = {() => setRoute("products")}>Show Products</button>
         <button className = "button"  onClick = {() => setRoute("cart")}> My Cart </button>
         <button className = "button"  onClick = {() => setRoute("wishlist")}> My Wishlist </button>

        {route === "products" && <ProductListing/>}
        {route === "cart" && <Cart/>}
        {route === "wishlist" && <Wishlist/>}

      </div>
   );
}

export default App;
