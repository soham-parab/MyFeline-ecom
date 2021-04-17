import { createContext, useContext, useReducer } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
   const [state, dispatch] = useReducer(reducerFunction, {
      products: [],
      cart: [],
      wishlist: [],
      INSTOCK: false,
      FASTDELIVERY: false,
      SORTBYPRICE: "",
      RANGERVALUE: 1000,
      loading: true,
   });

   return (
      <ProductsContext.Provider value={{ state, dispatch }}>
         {children}
      </ProductsContext.Provider>
   );
}

export function useProducts() {
   return useContext(ProductsContext);
}

const reducerFunction = (acc, action) => {
   switch (action.type) {
      case "SET PRODUCTS":
         return {
            ...acc,
            products: action.payload,
         };
      case "ADD TO CART":
         return { ...acc, cart: [...acc.cart, action.payload] };
      case "ADD TO WISHLIST":
         return { ...acc, wishlist: [...acc.wishlist, action.payload] };

      case "MOVE TO WISHLIST FROM CART":
         return {
            ...acc,
            wishlist: [...acc.wishlist, action.payload],
            cart: removeItemFromList(acc.cart, action.payload),
         };

      case "DELETE FROM CART":
         return { ...acc, cart: removeItemFromList(acc.cart, action.payload) };
      case "DELETE FROM WISHLIST":
         return {
            ...acc,
            wishlist: removeItemFromList(acc.wishlist, action.payload),
         };
      case "MOVE TO CART FROM WISHLIST":
         return {
            ...acc,
            cart: [...acc.cart, action.payload],
            wishlist: removeItemFromList(acc.wishlist, action.payload),
         };
      case "INCREMENT":
         return {
            ...acc,
            cart: acc.cart.map((item) =>
               item.id === action.payload.id
                  ? { ...item, qty: action.payload.qty + 1 }
                  : item
            ),
         };

      case "DECREMENT":
         return action.payload.qty - 1 === 0
            ? { ...acc, cart: removeItemFromList(acc.cart, action.payload) }
            : {
                 ...acc,
                 cart: acc.cart.map((item) =>
                    item.id === action.payload.id
                       ? { ...item, qty: action.payload.qty - 1 }
                       : item
                 ),
              };

      default:
         break;
   }
};

const removeItemFromList = (listItems, itemToBeRemoved) => {
   return listItems.filter((item) => item.id !== itemToBeRemoved.id);
};
