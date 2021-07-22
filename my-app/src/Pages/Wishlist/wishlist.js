import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import axios from "axios";
import "./wishlist.css";
import {
  deleteRequestWishlist,
  moveToCart,
} from "../../components/utilities/utilities";
import { useAuth } from "../../contexts/AuthContext";
import { baseURL } from "../../components/utilities/baseURL";
import { useToast } from "../../contexts/toastContext";
export function Wishlist() {
  const { toast } = useToast();
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();
  document.title = `${auth.userExists.name}'s cart`;

  useEffect(() => {
    (async function () {
      try {
        const productData = await axios.get(`${baseURL}/wishlist`, {
          headers: {
            "auth-token": auth.token,
          },
        });

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
        {state.wishlist?.length === 0 && (
          <h1>{auth.userExists.name}, your wishlist is empty! </h1>
        )}
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
                      <b>Rs {item.price}/-</b>
                    </div>
                  </div>
                  <div className="horizCardFooter">
                    <button
                      onClick={() => {
                        deleteRequestWishlist(item, dispatch, auth, toast);
                      }}
                      className="horizFooterBtnn secBtn"
                    >
                      Remove from Wishlist
                    </button>

                    <button
                      onClick={() => {
                        moveToCart(item, dispatch, auth, toast);
                        deleteRequestWishlist(item, dispatch, auth, toast);
                      }}
                      className="horizFooterBtnn"
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
