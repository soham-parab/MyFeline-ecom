import { useEffect } from "react";
import { useState, useReducer } from "react";
import { useProduct } from "../contexts/ProductsContext";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

import "./components.css";

export function ProductListing() {
   const { products, setProducts } = useProduct();
   const { itemsInCart, setItemsInCart } = useCart();
   const { itemsInWishlist, setItemsInWishlist } = useWishlist();

   useEffect(() => {
      (async function () {
         const productData = await axios.get("../api/products");
         setProducts(productData.data.products);
      })();
   }, []);

   return (
      <div>
         <h1>Products!</h1>
         {products.map((item) => {
            return (
               <div key={item.id} style={{ padding: " 1 rem" }}>
                  <p className="productName">{item.name}</p>
                  <img
                     className="productImage"
                     src={item.image}
                     alt="error"
                  ></img>
                  <p className="itemPrice">{item.price}</p>

                  <div className="cartDiv">
                     <button
                        className="cartButton"
                        onClick={() => setItemsInCart((prd) => [...prd, item])}
                     >
                        Add to Cart
                     </button>
                  </div>
                  <div className="wishListDiv">
                     <button
                        className="wishListButton"
                        onClick={() =>
                           setItemsInWishlist((prd) => [...prd, item])
                        }
                     >
                        Add to Wishlist
                     </button>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
