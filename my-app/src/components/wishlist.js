import react from "react";
import { useState, useReducer, useEffect } from "react";
import { useProducts } from "../contexts/ProductContext";
import axios from "axios";
import "./wishlist.css";

export function Wishlist() {
   const { state, dispatch } = useProducts();

   useEffect(() => {
      (async function () {
         try {
            const productData = await axios.get(
               "http://localhost:3500/wishlist"
            );

            dispatch({
               type: "SET WISHLIST",
               payload: productData.data,
            });
         } catch (error) {
            dispatch({ type: "LOADING", payload: false });
         }
      })();
   }, []);

   return (
      <div className="cart-parent">
         <div className="card-holder">
            {state.wishlist.map((item) => {
               return (
                  <div>
                     <div className="horizCardParent">
                        <div className="horizCardBody">
                           <div className="HorizImgDiv">
                              <img src={item.images} alt="error"></img>
                           </div>
                           <p className="prdDescrip">{item.description}</p>


                           <div className="HorizCardDetails">
                              <div className="brandTitle">{item.name}</div>

                              <div className="prdPrice">
                                 <b>{item.price}</b>
                              </div>
                           </div>
                           <div className="horizCardFooter">
                              <button
                                 onClick={() => {
                                    dispatch({
                                       type: "DELETE FROM WISHLIST",
                                       payload: item,
                                    });
                                 }}
                                 className="horizFooterBtn secBtn"
                              >
                                 Remove from Wishlist
                              </button>

                              <button
                                 onClick={() => {
                                    dispatch({
                                       type: "MOVE TO CART FROM WISHLIST",
                                       payload: item,
                                    });
                                 }}
                                 className="horizFooterBtn"
                              >
                                 Move to Cart
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
