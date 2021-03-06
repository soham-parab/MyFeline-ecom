import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  postRequestCart,
  postRequestWishlist,
} from "../../components/utilities/utilities";
import {
  getPriceRangeData,
  getSortedData,
} from "../../reducers/productReducer";
import "./products.css";
import { useProducts } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/toastContext";
import { getFilteredData } from "../../components/filters/DataFilters";
import { Action } from "history";
export function ProductListing() {
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();
  const { toast } = useToast();

  useEffect(() => {
    (async function () {
      try {
        const productData = await axios.get(
          "https://my-feline-rest-api.herokuapp.com/products"
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

  let filteredData = getFilteredData(state, priceRangeData);

  return (
    <div className="productDiv">
      <div className="aside">
        <h2 className="heading-two">Filter Items</h2>
        <h3 className="heading-three"> Sort by Price</h3>
        <label className="radio-label">
          <input
            className="radio-buttons"
            type="radio"
            name="sort"
            value={state.sortBy}
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"}
          />{" "}
          High to low
        </label>{" "}
        <br />
        <label className="radio-label">
          <input
            className="radio-buttons"
            type="radio"
            name="sort"
            value={state.sortBy}
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"}
          />{" "}
          Low to High
        </label>
        <br />
        <label className="radio-label">
          Price Range:- Rs {state.price_range}/-
          <input
            className="price-button"
            type="range"
            min="200"
            max="2000"
            value={state.price_range}
            onChange={(e) =>
              dispatch({ type: "PRICE_RANGE", payload: e.target.value })
            }
          />
        </label>
        <br />
        <h3 className="heading-three">Categories</h3>
        <label>
          <input
            checked={state.filters.sortByType.includes("Kibble")}
            onChange={() =>
              dispatch({ type: "SORT_BY_CATEGORY", payload: "Kibble" })
            }
            type="checkbox"
            name="Kibble"
          />{" "}
          Kibble
        </label>
        <label>
          <input
            checked={state.filters.sortByType.includes("Gravy Food")}
            onChange={() =>
              dispatch({ type: "SORT_BY_CATEGORY", payload: "Gravy Food" })
            }
            type="checkbox"
            name="Gravy food."
          />
          Gravy food
        </label>
        <label>
          <input
            checked={state.filters.sortByType.includes("Treats")}
            onChange={() =>
              dispatch({ type: "SORT_BY_CATEGORY", payload: "Treats" })
            }
            type="checkbox"
            name="Treats"
          />
          Treats
        </label>
        <label>
          <input
            checked={state.filters.sortByType.includes("Misc")}
            onChange={() =>
              dispatch({ type: "SORT_BY_CATEGORY", payload: "Misc" })
            }
            type="checkbox"
            name="Accessories"
          />
          Accessories
        </label>
        <h3 className="heading-three">Brands</h3>
        <label>
          <input
            checked={state.filters.sortByBrand.includes("Royal Canin")}
            onChange={() => {
              dispatch({ type: "SORT_BY_BRAND", payload: "Royal Canin" });
            }}
            type="checkbox"
            name="RoyalCanin"
          />
          Royal Canin
        </label>
        <label>
          <input
            checked={state.filters.sortByBrand.includes("Whiskas")}
            onChange={() => {
              dispatch({ type: "SORT_BY_BRAND", payload: "Whiskas" });
            }}
            type="checkbox"
            name="Whiskas"
          />
          Whiskas
        </label>
        <h3 className="heading-three">Delivery</h3>
        <label>
          <input
            checked={state.filters.FASTDELIVERY.includes("true")}
            onChange={() =>
              dispatch({ type: "SORT_BY_DELIVERY", payload: "true" })
            }
            className=""
            type="checkbox"
            name="Fast Delivery Only"
          />{" "}
          Fast Delivery
        </label>
        <button
          className="reset-button"
          onClick={() => dispatch({ type: "RESET" })}
        >
          RESET
        </button>
      </div>

      <div className="card-parent">
        {filteredData.map((item) => {
          return (
            <div className="cardSecondary">
              <Link to={`/productpage/${item._id}`}>
                <div className="imgDiv secondaryImgDiv">
                  <img
                    className="productImg"
                    src={item.images}
                    alt="error"
                  ></img>
                </div>
              </Link>
              <div className="cardDetail">
                <h3 className="productTitle">{item.name}</h3>

                <h4 className="productPrice">Rs {item.price}/-</h4>
                <div className="btn-div">
                  <button
                    onClick={() => {
                      postRequestCart(item, auth, toast);
                    }}
                    className="icon-button"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => {
                      postRequestWishlist(item, auth, toast);
                    }}
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
