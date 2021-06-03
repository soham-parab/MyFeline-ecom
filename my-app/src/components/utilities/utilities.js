import react from "react";
import { useEffect, usestate, useReducer } from "react";
import axios from "axios";
import { useProducts } from "../../contexts/ProductContext";

export const postRequestCart = (prd) => {
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
            }
         );
         console.log(response, "adawda");
      } catch (error) {
         console.log(error);
      }
   })();
};

export const postRequestWishlist = (prd) => {
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
            }
         );
      } catch (error) {
         console.log(error);
      }
   })();
};

export const deleteRequestCart = (prd, dispatch) => {
   (async function () {
      try {
         const response = await axios.delete(
            `https://my-feline-rest-api.herokuapp.com/cart/${prd._id}`
         );
         console.log(response, "sadasd");
         dispatch({ type: "SET CART", payload: response.data });
      } catch (error) {
         console.log(error);
      }
   })();
};

export const moveToWishlist = (prd, dispatch) => {
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
            }
         );
      } catch (error) {
         console.log(error);
      }
   })();
};

export const incrementQuantity = (prd, dispatch) => {
   (async function () {
      try {
         const response = await axios.patch(
            `https://my-feline-rest-api.herokuapp.com/cart/${prd._id}`,
            {
               quantity: prd.quantity + 1,
            }
         );
         console.log(response);
         dispatch({ type: "SET CART", payload: response.data });
      } catch (error) {
         console.log(error);
      }
   })();
};

export const decrementQuantity = (prd, dispatch) => {
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
};

export const deleteRequestWishlist = (prd, dispatch) => {
   (async function () {
      try {
         const response = await axios.delete(
            `https://my-feline-rest-api.herokuapp.com/wishlist/${prd._id}`
         );
         console.log(response, "sadasd");
         dispatch({ type: "SET WISHLIST", payload: response.data });
      } catch (error) {
         console.log(error);
      }
   })();
};

export const moveToCart = (prd, dispatch) => {
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
            }
         );
      } catch (error) {
         console.log(error);
      }
   })();
};

const totalPrice = () => {};

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
