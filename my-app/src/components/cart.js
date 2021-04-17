import react from "react";
import { useState, useReducer } from "react";
import { useProducts } from "../contexts/ProductContext";

export function Cart() {
   const { state, dispatch } = useProducts();

   return (
      <div>
         {state.cart.map((item) => {
            return (
               <div style={{ padding: " 1 rem" }}>
                  <img src={item.image} alt="error"></img>
                  <h1>{item.name}</h1>
                  <h1>{item.price}</h1>
                  <p>wjadisd</p>
                  <button
                     className="button"
                     onClick={() => {
                        dispatch({ type: "INCREMENT", payload: item });
                     }}
                  >
                     +
                  </button>
                  {item.qty}
                  <button
                     className="button"
                     onClick={() => {
                        dispatch({ type: "DECREMENT", payload: item });
                     }}
                  >
                     -
                  </button>

                  <button
                     onClick={() =>
                        dispatch({
                           type: "MOVE TO WISHLIST FROM CART",
                           payload: item,
                        })
                     }
                  >
                     Move to Wishlist
                  </button>

                  <button
                     onClick={() =>
                        dispatch({ type: "DELETE FROM CART", payload: item })
                     }
                  >
                     Remove From Cart
                  </button>
               </div>
            );
         })}
      </div>
   );
}
