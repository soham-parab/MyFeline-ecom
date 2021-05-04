import { useEffect } from "react";
import axios from "axios";
import {
   useProducts,
   getSortedData,
   getPriceRangeData,
} from "../contexts/ProductContext";
import "./products.css";
import { FaShoppingCart } from "react-icons/fa";
import {postRequestCart,postRequestWishlist} from "./utilities/utilities"
export function ProductListing() {
   const { state, dispatch } = useProducts();

   useEffect(() => {
      (async function () {
         try {
            const productData = await axios.get(
               "http://localhost:3500/products"
            );

            dispatch({
               type: "SET PRODUCTS",
               payload: productData.data,
            });
         } catch (error) {
            dispatch({ type: "LOADING", payload: false });
         }
      })();
   }, []);

   let sortedData = getSortedData(state.products, state.sortBy);

   let priceRangeData = getPriceRangeData(sortedData, state.price_range);

   return (
      <div className="productDiv">
         <div className="aside">
            <h1>Filter Items.</h1>
            <label>
               <input
                  type="radio"
                  name="sort"
                  value={state.sortBy}
                  onChange={() =>
                     dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                  }
                  checked={state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"}
               />{" "}
               HIGH TO LOW
            </label>{" "}
            ||
            <label>
               <input
                  type="radio"
                  name="sort"
                  value={state.sortBy}
                  onChange={() =>
                     dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                  }
                  checked={state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"}
               />{" "}
               LOW TO HIGH
            </label>
            <label>
               Price Range:-{" "}
               <input
                  type="range"
                  min="200"
                  max="2000"
                  value={state.price_range}
                  onChange={(e) =>
                     dispatch({ type: "PRICE_RANGE", payload: e.target.value })
                  }
               />
            </label>
            <button onClick={() => dispatch({ type: "RESET" })}>RESET</button>
         </div>

         <div className="card-parent">
            {priceRangeData.map((item) => {
               return (
                  <div className="cardSecondary">
                     <div className="imgDiv secondaryImgDiv">
                        <img className="productImg" src={item.images} alt="error"></img>
                     </div>
                     <div className="cardDetail">
                        <h3 className="productTitle">{item.name}</h3>

                        <h4 className="productPrice">Rs {item.price}/-</h4>
                        <div
                           className="btn-div"
                           // onClick={() => {
                           //    dispatch({ type: "ADD TO CART", payload: item });
                           // }}
                        >
                           <button
                              onClick={() => {postRequestCart(item)}}
                              className="icon-button"
                           >
                              Add to Cart
                           </button>
                           <button
                              className="icon-button"
                              onClick={() => {postRequestWishlist(item)}}
                              
                              
                              
                              
                                 //    dispatch({
                              //       type: "ADD TO WISHLIST",
                              //       payload: item,
                              //    });
                              // }}
                           >
                              {" "}
                              Add to Wishlist
                           </button>
                        </div>

                        <div className="productPrice"></div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

// <div key={item.id} style={{ padding: " 1 rem" }}>
{
   /* <p className="productName">{item.name}</p>
                  <img
                     className="productImage"
                     src={item.images}
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
                     </button> */
}
{
   /* </div> */
}
