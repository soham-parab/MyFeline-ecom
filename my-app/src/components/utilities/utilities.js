import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const baseURL = "https://my-feline-rest-api.herokuapp.com";
export const postRequestCart = (prd, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          `http://localhost:3400/cart`,
          {
            name: prd.name,
            description: prd.description,
            images: prd.images,
            price: prd.price,
            rating: prd.rating,
            total_ratings: prd.total_ratings,
            category: prd.category,
            brand: prd.brand,
            quantity: prd.quantity,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response, "adawda");
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const postRequestWishlist = (prd, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          "https://my-feline-rest-api.herokuapp.com/wishlist",
          {
            name: prd.name,
            description: prd.description,
            images: prd.images,
            price: prd.price,
            rating: prd.rating,
            total_ratings: prd.total_ratings,
            category: prd.category,
            brand: prd.brand,
            quantity: prd.quantity,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const deleteRequestCart = (prd, dispatch, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.delete(
          `http://localhost:3400/cart/${prd._id}`,
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response, "sadasd");
        dispatch({ type: "SET CART", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const moveToWishlist = (prd, dispatch, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          "https://my-feline-rest-api.herokuapp.com/wishlist",

          {
            name: prd.name,
            description: prd.description,
            images: prd.images,
            price: prd.price,
            rating: prd.rating,
            total_ratings: prd.total_ratings,
            category: prd.category,
            brand: prd.brand,
            quantity: prd.quantity,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const incrementQuantity = (prd, dispatch, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.patch(
          `https://my-feline-rest-api.herokuapp.com/cart/${prd._id}`,
          {
            quantity: prd.quantity + 1,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response);
        dispatch({ type: "SET CART", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("erorrr");
  }
};

export const decrementQuantity = (prd, dispatch, auth) => {
  if (auth) {
    if (prd.quantity === 1) {
      deleteRequestCart(prd, dispatch);
    } else {
      (async function () {
        try {
          const response = await axios.patch(
            `https://my-feline-rest-api.herokuapp.com/cart/${prd._id}`,
            {
              quantity: prd.quantity - 1,
            }
          );
          console.log(response);
          dispatch({ type: "SET CART", payload: response.data });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  } else {
    console.log("error");
  }
};

export const deleteRequestWishlist = (prd, dispatch, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.delete(
          `https://my-feline-rest-api.herokuapp.com/wishlist/${prd._id}`,
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response, "sadasd");
        dispatch({ type: "SET WISHLIST", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const moveToCart = (prd, dispatch, auth) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          "https://my-feline-rest-api.herokuapp.com/cart",
          {
            name: prd.name,
            description: prd.description,
            images: prd.images,
            price: prd.price,
            rating: prd.rating,
            total_ratings: prd.total_ratings,
            category: prd.category,
            brand: prd.brand,
            quantity: prd.quantity,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const itemPrice = (easy) => {
  let total = 0;
  easy.cart.map((item) => {
    total = total + item.price * item.quantity;
  });

  return total;
};

export function priceProductTotal(product) {
  const total = parseInt(product.price) * parseInt(product.quantity);
  return total;
}
