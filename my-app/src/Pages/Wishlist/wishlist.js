import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import axios from "axios";
import "./wishlist.css";
import {
  deleteRequestWishlist,
  moveToCart,
} from "../../components/utilities/utilities";
import { useAuth } from "../../contexts/AuthContext";
export function Wishlist() {
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();

  useEffect(() => {
    (async function () {
      try {
        const productData = await axios.get(
          "https://my-feline-rest-api.herokuapp.com/wishlist",

          {
            headers: {
              "auth-token": auth.token,
            },
          }
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
                        deleteRequestWishlist(item, dispatch, auth);
                      }}
                      className="horizFooterBtn secBtn"
                    >
                      Remove from Wishlist
                    </button>

                    <button
                      onClick={() => {
                        moveToCart(item, dispatch, auth);
                        deleteRequestWishlist(item, dispatch, auth);
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
