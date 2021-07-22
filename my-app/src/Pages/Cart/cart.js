import { useProducts } from "../../contexts/ProductContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./cart.css";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import axios from "axios";
import {
  decrementQuantity,
  deleteRequestCart,
  incrementQuantity,
  itemPrice,
  moveToWishlist,
  priceProductTotal,
} from "../../components/utilities/utilities";
import { baseURL } from "../../components/utilities/baseURL";
import { Button } from "@chakra-ui/react";
import { PayPal } from "../../components/Payment/PayPal";
import { useToast } from "../../contexts/toastContext";
export function Cart() {
  const [checkout, setCheckout] = useState(false);
  const toast = useToast();
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();

  document.title = `${auth.userExists.name}'s cart`;
  useEffect(() => {
    (async function () {
      try {
        const productData = await axios.get(`${baseURL}/cart`, {
          headers: {
            "auth-token": auth.token,
          },
        });
        console.log(productData.data);
        dispatch({
          type: "SET CART",
          payload: productData.data,
        });
      } catch (error) {
        dispatch({ type: "LOADING", payload: false });
      }
    })();
  }, []);
  console.log(state.cart);
  return (
    <div className="cart-parent">
      <div className="card-holder">
        {state.cart?.length === 0 && (
          <h1>{auth.userExists.name}, your cart is empty! </h1>
        )}
        {console.log(state.cart.length)}
        {state &&
          state.cart.map((item) => {
            return (
              <div>
                <div className="horizCardParent">
                  <div className="horizCardBody">
                    <div className="HorizImgDiv">
                      <img src={item.images} />
                    </div>
                    <div className="HorizCardDetails">
                      <div className="brandTitle">{item.name}</div>
                      <p className="prdDescripp">{item.description}</p>
                      <div className="horizCardBtnDiv">
                        <BsPlusSquare
                          onClick={() =>
                            incrementQuantity(item, dispatch, auth)
                          }
                          className="icon-button-quantity"
                        />
                        <span className="amt"> {item.quantity} </span>
                        <BsDashSquare
                          onClick={() =>
                            decrementQuantity(item, dispatch, auth)
                          }
                          className="icon-button-quantity"
                        />
                      </div>
                      <div className="prdPrice">
                        <b>{priceProductTotal(item)}</b>
                      </div>
                    </div>
                  </div>
                  <div className="horizCardFootera">
                    <button
                      onClick={() => {
                        deleteRequestCart(item, dispatch, auth, toast);
                      }}
                      className="horizFooterBtna secBtn"
                    >
                      Remove from Cart
                    </button>
                    <button
                      onClick={
                        (() => moveToWishlist(item, dispatch, auth, toast),
                        () => deleteRequestCart(item, dispatch, auth, toast))
                      }
                      className="horizFooterBtna"
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
            <div className="paymentAmt">{itemPrice(state)}</div>
          </div>

          <div className="paymentSect">
            <div className="paymentAmt">Total Discount</div>
            <div className="paymentAmt discAmt">-₹0</div>
          </div>

          <div className="paymentSect paymentSectTotal">
            <div className="paymentAmt">Total Amount</div>
            <div className="paymentAmt ">{itemPrice(state)}</div>
          </div>
        </div>
        <Button onClick={() => setCheckout(true)} className="checkout">
          Checkout
        </Button>
        {checkout && <PayPal totalPrice={itemPrice(state)} />}
      </div>
    </div>
  );
}
