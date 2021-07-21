import "./productpage.css";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import {
  postRequestCart,
  postRequestWishlist,
} from "../../components/utilities/utilities";
import { useAuth } from "../../contexts/AuthContext";
import { useToast, Wrap, Button, WrapItem } from "@chakra-ui/react";

export const ProductPage = () => {
  const { state } = useProducts();
  const { id } = useParams();
  const { auth } = useAuth();

  function ToastStatusExample() {
    const toast = useToast();
    const statuses = ["success", "error", "warning", "info"];

    return (
      <Wrap>
        {statuses.map((status, i) => (
          <WrapItem key={i}>
            <Button
              onClick={() =>
                toast({
                  title: `${status} toast`,
                  status: status,
                  isClosable: true,
                })
              }
            >
              Show {status} toast
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    );
  }

  return (
    <div>
      {state.products
        .filter((item) => {
          return item._id === id;
        })
        .map((item) => {
          return (
            <div className="products-page-div">
              <div className="image-div">
                <img className="item-image" src={item.images} alt="nevermind" />
              </div>
              <div className="product-div">
                <h1 className="item-name">{item.name}</h1>
                <p className="item-brand">{item.brand}</p>
                <p className="item-descrip">{item.description}</p>
                <p className="item-price">Rs {item.price}/-</p>
                <p className="item-rating">{item.rating}/5</p>
                <p className="item-total-rating">
                  Total Ratings: {item.total_ratings}
                </p>
                <button
                  className="post-btn-cart"
                  onClick={() => postRequestCart(item, auth)}
                >
                  Add to Cart
                </button>
                <button
                  className="post-btn-wishlist"
                  onClick={() => postRequestWishlist(item, auth)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
