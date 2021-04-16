import react from "react";
import { useState, useReducer } from "react";
import { useCart } from "../contexts/CartContext";

const removeItemFromCart = (cartItems, itemToBeRemoved) => {
   return cartItems.filter((item) => item.id !== itemToBeRemoved.id);
};

export function Cart() {
   const reducerFunction = (state, action) => {
      switch (action.type) {
         case "INCREMENT":
            return {
               ...state,
               itemsInCart: state.itemsInCart.map((item) =>
                  item.id === action.payload.id
                     ? { ...item, qty: item.qty + 1 }
                     : item
               ),
            };
         case "DECREMENT":
            return (action.payload.qty - 1 === 0)
               ? {
                    ...state,
                    itemsInCart: removeItemFromCart(
                       state.itemsInCart,
                       action.payload
                    ),
                 }
               : {
                    ...state,
                    itemsInCart: state.itemsInCart.map((item) =>
                       item.id === action.payload.id
                          ? { ...item, qty: item.qty - 1 }
                          : item
                    ),
                 };

         case "MOVE TO WISHLIST":
            return null;
         case "DELETE FROM CART":
            return {
               ...state,
               itemsInCart: removeItemFromCart(
                  state.itemsInCart,
                  action.payload
               ),
            };
         default:
            break;
      }
   };

   const { itemsInCart, setItemsInCart } = useCart();
   const [value, dispatch] = useReducer(reducerFunction, {
      itemsInCart,
   });

   return (
      <div>
         {value.itemsInCart.map((item) => {
            return (
               <div>
                  <img src={item.image} alt="error"></img>
                  <h1>{item.name}</h1>
                  <h1>{item.price}</h1>

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
                        dispatch({ type: "MOVE TO WISHLIST", payload: item })
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
