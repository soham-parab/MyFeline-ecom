import react from "react";
import { useState, useReducer } from "react";
import { useWishlist } from "../contexts/WishlistContext";

import "./components.css";

const removeFromWishlist = (wishlistItems, itemToBeRemoved) => {
   return wishlistItems.filter(
      (item) => item.id !== itemToBeRemoved.id
   );
};

const reducerFunction = (state, action) => {
   switch (action.type) {
      case "REMOVE FROM WISHLIST":
         return {...state,itemsInWishlist:removeFromWishlist(state.itemsInWishlist,action.payload)};
      case "MOVE TO CART":
         return null;
      default:
         console.log("error");
   }
};

export function Wishlist() {
   const { itemsInWishlist, setItemsInWishlist } = useWishlist();
   const [value, dispatch] = useReducer(reducerFunction, { itemsInWishlist });

   return (
      <div>
         {value.itemsInWishlist.map((item) => {
            return (
               <div>
                  <img src={item.image} alt="error"></img>
                  <p>
                     <b>{item.name}</b>
                  </p>
                  <p>{item.price}</p>

                  <button onClick={() => {dispatch({type:"REMOVE FROM WISHLIST", payload: item})}}>
                    
                     Remove from Wishlist
                  </button>
               </div>
            );
         })}
      </div>
   );
}
