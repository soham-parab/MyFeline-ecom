import { useEffect } from "react";
import axios from "axios";
import { useProducts } from "../contexts/ProductContext";
import "./components.css";

export function ProductListing() {
   const { state, dispatch } = useProducts();

   useEffect(() => {
      (async function () {
         try {
            const productData = await axios.get("../api/products");
            // setProducts(productData.data.products);
            dispatch({
               type: "SET PRODUCTS",
               payload: productData.data.products,
            });
         } catch (error) {
            dispatch({ type: "LOADING", payload: false });
         }
      })();
   }, []);

   return (
      <div>
         <h1>Products!</h1>
         {state.products.map((item) => {
            return (
               <div key={item.id} style={{ padding: " 1 rem" }}>
                  <p className="productName">{item.name}</p>
                  <img
                     className="productImage"
                     src={item.image}
                     alt="error"
                  ></img>
                  <p className="itemPrice">{item.price}</p>

                  <div className="cartDiv">
                     <button
                        onClick={() => {
                           dispatch({ type: "ADD TO CART", payload: item });
                        }}
                        className="cartButton"
                     >
                        Add to Cart
                     </button>
                  </div>
                  <div className="wishListDiv">
                     <button
                        onClick={() => {
                           dispatch({ type: "ADD TO WISHLIST", payload: item });
                        }}
                        className="wishListButton"
                     >
                        Add to Wishlist
                     </button>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
