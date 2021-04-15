import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
   const [products, setProducts] = useState([]);

   return (
      <ProductContext.Provider value={{ products, setProducts }}>
         {children}
      </ProductContext.Provider>
   );
}

export function useProduct() {
   return useContext(ProductContext);
}
