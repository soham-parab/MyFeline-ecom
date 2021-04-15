import react from "react";
import { useState, useReducer } from "react";
import { useCart } from "../contexts/CartContext";

export function Cart() {
   const { itemsInCart, setItemsInCart } = useCart();
   console.log(itemsInCart);
   return (
      <div>
         {itemsInCart.map((items) => {
            return (
               <div>
                  <img src={items.image} alt = "error"></img>
                  <h1>{items.name}</h1>
                  <h1>{items.price}</h1>
               </div>
            );
         })}
      </div>
   );
}
