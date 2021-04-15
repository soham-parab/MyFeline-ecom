import react from "react";
import { useState, useReducer } from "react";
import { useWishlist } from "../contexts/WishlistContext";

export function Wishlist() {
    const { itemsInWishlist } = useWishlist();
 
    return (
       <div>
          {itemsInWishlist.map((items) => {
             return <h1>{items}</h1>;
          })}
       </div>
    );
 }