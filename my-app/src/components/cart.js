import react from "react";
import { useState, useReducer } from "react";
// import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
// import { useWishlist } from "../contexts/WishlistContext";

export function Cart() {
   // const { itemsInCart, setItemsInCart } = useCart();
   // const { itemsInWishlist, setItemsInWishlist } = useWishlist();

   const { state, dispatch } = useProducts();

   // const reducerFunction = (state, action) => {
   //    switch (action.type) {
   //       case "INCREMENT":
   //          return {
   //             ...state,
   //             itemsInCart: state.itemsInCart.map((item) =>
   //                item.id === action.payload.id
   //                   ? { ...item, qty: item.qty + 1 }
   //                   : item
   //             ),
   //          };
   //       case "DECREMENT":
   //          return action.payload.qty - 1 === 0
   //             ? {
   //                  ...state,
   //                  itemsInCart: removeItemFromCart(
   //                     state.itemsInCart,
   //                     action.payload
   //                  ),
   //               }
   //             : {
   //                  ...state,
   //                  itemsInCart: state.itemsInCart.map((item) =>
   //                     item.id === action.payload.id
   //                        ? { ...item, qty: item.qty - 1 }
   //                        : item
   //                  ),
   //               };

   //       case "MOVE TO WISHLIST":
   //          return null;
   //       case "DELETE FROM CART":
   //          return {
   //             ...state,
   //             itemsInCart: removeItemFromCart(
   //                state.itemsInCart,
   //                action.payload
   //             ),
   //          };
   //       default:
   //          break;
   //    }
   // };

   // const [value, dispatch] = useReducer(reducerFunction, {
   //    itemsInCart,
   //    itemsInWishlist,
   // });
   // setItemsInCart(value.itemsInCart);
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
