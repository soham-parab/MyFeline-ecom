import react from "react";
import { useState, useReducer } from "react";
import { useWishlist } from "../contexts/WishlistContext";

import "./components.css";

export function Wishlist() {
   const { itemsInWishlist, setItemsInWishlist } = useWishlist();

   const removeFromWishlist = (wishlistItems, itemToBeRemoved) => {
      return wishlistItems.filter((item) => item.id !== itemToBeRemoved.id);
   };

   const reducerFunction = (state, action) => {
      switch (action.type) {
         case "REMOVE FROM WISHLIST":
            return {
               ...state,
               itemsInWishlist: removeFromWishlist(
                  state.itemsInWishlist,
                  action.payload
               ),
            };
         case "MOVE TO CART":
            return null;
         default:
            console.log("error");
      }
   };
   const [value, dispatch] = useReducer(reducerFunction, { itemsInWishlist });
   setItemsInWishlist(value.itemsInWishlist);

   return (
      <div>
         {itemsInWishlist.map((item) => {
            return (
               <div>
                  <img src={item.image} alt="error"></img>
                  <p>
                     <b>{item.name}</b>
                  </p>
                  <p>{item.price}</p>

                  <button
                     onClick={() => {
                        dispatch({
                           type: "REMOVE FROM WISHLIST",
                           payload: item,
                        });
                     }}
                  >
                     Remove from Wishlist
                  </button>
               </div>
            );
         })}
      </div>
   );
}
