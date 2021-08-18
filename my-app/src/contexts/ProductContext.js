import { createContext, useContext, useReducer } from "react";
import { reducerFunction } from "../reducers/productReducer";
export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    cart: [],
    wishlist: [],
    filters: {
      stock: [],
      FASTDELIVERY: [],
      sortByBrand: [],
      sortByType: [],
    },

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
