import axios from "axios";
import { baseURL } from "./baseURL";

export const postRequestCart = (prd, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          `${baseURL}/cart`,
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
        toast("Item added to cart!", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
    toast("Please login!", {
      type: "warning",
    });
  }
};

export const postRequestWishlist = (prd, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          `${baseURL}/wishlist`,
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
        toast("Item added to wishlist!", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
    toast("Please login!", {
      type: "warning",
    });
  }
};

export const deleteRequestCart = (prd, dispatch, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.delete(`${baseURL}/cart/${prd._id}`, {
          headers: {
            "auth-token": auth.token,
          },
        });
        console.log(response, "sadasd");
        toast("Item deleted from cart!", {
          type: "info",
        });

        dispatch({ type: "SET CART", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("please login");
  }
};

export const moveToWishlist = (prd, dispatch, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          `${baseURL}/wishlist`,

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
        toast("Item moved to wishlist!", {
          type: "success",
        });
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
          `${baseURL}/cart/${prd._id}`,
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

export const decrementQuantity = (prd, dispatch, auth, toast) => {
  if (auth) {
    if (prd.quantity === 1) {
      deleteRequestCart(prd, dispatch, auth, toast);
    } else {
      (async function () {
        try {
          const response = await axios.patch(
            `${baseURL}/cart/${prd._id}`,
            {
              quantity: prd.quantity - 1,
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
          console.log(error.response.data);
        }
      })();
    }
  } else {
    console.log("error");
  }
};

export const deleteRequestWishlist = (prd, dispatch, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.delete(`${baseURL}/wishlist/${prd._id}`, {
          headers: {
            "auth-token": auth.token,
          },
        });
        toast("Item deleted from wishlist!", {
          type: "info",
        });
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

export const moveToCart = (prd, dispatch, auth, toast) => {
  if (auth) {
    (async function () {
      try {
        const response = await axios.post(
          `${baseURL}/cart`,
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
        toast("Item moved to cart!", {
          type: "success",
        });
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
