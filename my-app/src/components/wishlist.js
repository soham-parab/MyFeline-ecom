import react from "react";
import { useState, useReducer } from "react";
import { useWishlist } from "../contexts/WishlistContext";

import "./components.css";

export function Wishlist() {
   const { itemsInWishlist, setItemsInWishlist } = useWishlist();

   return (
      <div>
         {itemsInWishlist.map((items) => {
            return (
               <div>
                  <img src={items.image} alt="error"></img>
                  <p>
                     <b>{items.name}</b>
                  </p>
                  <p>{items.price}</p>
               </div>
            );
         })}
      </div>
   );
}
