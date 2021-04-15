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
                   <h1>{items}</h1>
                </div>
             );
          })}
       </div>
    );
 }