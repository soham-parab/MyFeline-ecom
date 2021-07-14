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
export function ProductListing() {
  const { auth } = useAuth();
  const { state, dispatch } = useProducts();

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

  return (
    <div className="productDiv">
      <div className="aside">
        <h2>Filter Items</h2>
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
          Price Range:-{" "}
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
        <button
          className="reset-button"
          onClick={() => dispatch({ type: "RESET" })}
        >
          RESET
        </button>
        <label>
          <input
            onClick={() => dispatch({ type: "IN STOCK", payload: "true" })}
            className=""
            type="checkbox"
            name="in_stock_only"
          />{" "}
          In Stock Only
        </label>
        <label>
          <input type="checkbox" name="Treats" />
          Treats
        </label>
        <label>
          <input type="checkbox" name="Accessories" />
          Accessories
        </label>
        <label>
          <input type="checkbox" name="Kibble." /> Kibble
        </label>
        <label>
          <input type="checkbox" name="Gravy food." />
          Gravy food
        </label>
      </div>

      <div className="card-parent">
        {priceRangeData.map((item) => {
          console.log(item._id);
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
                      postRequestCart(item, auth);
                    }}
                    className="icon-button"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => {
                      postRequestWishlist(item, auth);
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
