import { useProducts } from "../../contexts/ProductContext";
import { useEffect } from "react";
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
export function Cart() {
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();

  useEffect(() => {
    (async function () {
      try {
        const productData = await axios.get(
          "https://my-feline-rest-api.herokuapp.com/cart",
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
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

  return (
    <div className="cart-parent">
      <div className="card-holder">
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
                      <p className="prdDescrip">{item.description}</p>
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
                  <div className="horizCardFooter">
                    <button
                      onClick={() => deleteRequestCart(item, dispatch, auth)}
                      className="horizFooterBtn secBtn"
                    >
                      Remove from Cart
                    </button>
                    <button
                      onClick={() => {
                        moveToWishlist(item, dispatch, auth);
                        deleteRequestCart(item, dispatch, auth);
                      }}
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
      </div>
    </div>
  );
}
