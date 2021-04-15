import { useEffect } from "react";
import { useState, useReducer } from "react";
import { useProduct } from "../contexts/ProductsContext";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

import "./components.css"

export function ProductListing() {
    const { products, setProducts } = useProduct();
    const { setItemsInCart } = useCart();
    const { setItemsInWishlist } = useWishlist();
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
                <div key={item.id}>
                   <p className="productName">{item.name}</p>
                   <img className="productImage" src={item.image} alt="nothing"></img>
                   <p className ="itemPrice">{item.price}</p>
                   <div className = "cartDiv">
                      <button className = "cartButton"
                         onClick={() =>
                            setItemsInCart((prd) => [...prd, item.name,item.price,item.image])
                         }
                      >
                         Add to Cart
                      </button>
                   </div>
                   <div className = "wishListDiv">
                      <button  className = "wishListButton"
                         onClick={() =>
                            setItemsInWishlist((prd) => [
                               ...prd,
                               item.name,
                               item.price,
                            ])
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