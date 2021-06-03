import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { incrementQuantity } from "../components/utilities/utilities";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
   const [state, dispatch] = useReducer(reducerFunction, {
      products: [],
      cart: [],
      wishlist: [],
      stock: false,
      FASTDELIVERY: false,
      sortBy: null,
      RANGERVALUE: 1000,
      price_range: 0,
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
      case "SET CART":
         return { ...acc, cart: action.payload };

      case "SET CART AFTER MOVE":
         return { ...acc };
      case "SET WISHLIST":
         return { ...acc, wishlist: action.payload };

      case "SORT":
         return { ...acc, sortBy: action.payload };
      case "PRICE_RANGE":
         return { ...acc, price_range: action.payload };
      case "RESET":
         return { ...acc, sortBy: null, price_range: 0 };
      case "IN STOCK":
         return {
            ...acc,
            products: { ...acc.products },
            stock: action.payload,
         };

      default:
         break;
   }
};

// case "MOVE TO WISHLIST FROM CART":
//    return {
//       ...acc,
//       wishlist: [...acc.wishlist, action.payload],
//       cart: removeItemFromList(acc.cart, action.payload),
//    };

// case "MOVE TO CART FROM WISHLIST":
//    return {
//       ...acc,
//       cart: [...acc.cart, action.payload],
//       wishlist: removeItemFromList(acc.wishlist, action.payload),
//    };
// case "DELETE FROM CART":
//    return { ...acc, cart: removeItemFromList(acc.cart, action.payload) };

// case "DELETE FROM WISHLIST":
//    return {
//       ...acc,
//       wishlist: removeItemFromList(acc.wishlist, action.payload),
//    };

// case "INCREMENT":
//    return {
//       ...acc,
//       cart: acc.cart.map((item) =>
//          item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity + 1 }
//             : item
//       ),
//    };

// case "DECREMENT":
//    return action.payload.quantity - 1 === 0
//       ? { ...acc, cart: removeItemFromList(acc.cart, action.payload) }
//       : {
//            ...acc,
//            cart: acc.cart.map((item) =>
//               item.id === action.payload.id
//                  ? { ...item, quantity: action.payload.quantity - 1 }
//                  : item
//            ),
//         };

// const removeItemFromList = (listItems, itemToBeRemoved) => {
//    return listItems.filter((item) => item.id !== itemToBeRemoved.id);
// };

export function getSortedData(productList, sortBy) {
   if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return [...productList].sort((a, b) => b["price"] - a["price"]);
   }
   if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productList].sort((a, b) => a["price"] - b["price"]);
   }
   return productList;
}

export function getPriceRangeData(productList, price_range) {
   if (parseInt(price_range, 10) > 0) {
      return productList.filter(
         (item) => parseInt(item.price, 10) < parseInt(price_range, 10)
      );
   }
   return productList;
}
