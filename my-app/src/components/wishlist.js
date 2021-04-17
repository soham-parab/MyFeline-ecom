import react from "react";
import { useState, useReducer } from "react";
import { useProducts } from "../contexts/ProductContext";

import "./components.css";

export function Wishlist() {
   const { state, dispatch } = useProducts();

   return (
      <div>
         {state.wishlist.map((item) => {
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
                           type: "DELETE FROM WISHLIST",
                           payload: item,
                        });
                     }}
                  >
                     Remove from Wishlist
                  </button>


                  <button
                     onClick={() => {
                        dispatch({
                           type: "MOVE TO CART",
                           payload: item,
                        });
                     }}
                  >
                     Move to Cart
                  </button>
               </div>
            );
         })}
      </div>
   );
}
