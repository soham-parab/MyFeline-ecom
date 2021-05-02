import { useProducts } from "../contexts/ProductContext";
import {useEffect} from "react";

import "./cart.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import axios from "axios";
export function Cart() {
   const { state, dispatch } = useProducts();

   useEffect(() => {
      (async function () {
         try {
            const productData = await axios.get(
               "http://localhost:3500/cart"
            );
            console.log(productData);

            dispatch({
               type: "SET CART",
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
            {state.cart.map((item) => {
               console.log(item)
               return (
                  <div>
                     <div className="horizCardParent">
                        <div className="horizCardBody">
                           <div className="HorizImgDiv">
                              <img src={item.images} />
                           </div>
                           <div className="HorizCardDetails">
                              <div className="brandTitle">{item.name}</div>
                              <p className="prdDescrip">{item.description}</p>
                              <div className="horizCardBtnDiv">
                                 <BsPlusSquare
                                    onClick={() => {
                                       dispatch({
                                          type: "INCREMENT",
                                          payload: item,
                                       });
                                    }}
                                    className="icon-button-quantity"
                                 />
                                 <span className="amt"> {item.quantity} </span>
                                 <BsDashSquare
                                    onClick={() => {
                                       dispatch({
                                          type: "DECREMENT",
                                          payload: item,
                                       });
                                    }}
                                    className="icon-button-quantity"
                                 />
                              </div>
                              <div className="prdPrice">
                                 <b>{item.price}</b>
                              </div>
                           </div>
                        </div>
                        <div className="horizCardFooter">
                           <button
                              onClick={() =>
                                 dispatch({
                                    type: "DELETE FROM CART",
                                    payload: item,
                                 })
                              }
                              className="horizFooterBtn secBtn"
                           >
                              Remove
                           </button>
                           <button
                              onClick={() =>
                                 dispatch({
                                    type: "MOVE TO WISHLIST FROM CART",
                                    payload: item,
                                 })
                              }
                              className="horizFooterBtn"
                           >
                              Move to Wishlist
                           </button>
                        </div>
                     </div>
                  </div>

                  
               );
            })}
         </div>
         <div className="payment-main">
            <div className="paymentContainer">
               <div className="paymentSect">
                  <div className="paymentSectTitle">Total MRP</div>
                  <div className="paymentAmt">₹</div>
               </div>

               <div className="paymentSect">
                  <div className="paymentAmt">Total Discount</div>
                  <div className="paymentAmt discAmt">-₹0</div>
               </div>

               <div className="paymentSect paymentSectTotal">
                  <div className="paymentAmt">Total Amount</div>
                  <div className="paymentAmt ">₹</div>
               </div>
            </div>
         </div>
      </div>
   );
}
