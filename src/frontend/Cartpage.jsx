import cartSlice, {
  addToCart,
  DecreasedMycart,
  clearallcart,
  RemoveFromCart,
  gettingTotal,
} from "../cartsclice/cartSlice";
import "./Cartpage.css";
import { useSelector } from "react-redux";
import { Delete, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cartpage() {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(gettingTotal());
  }, [cart]);
  const dispatch = useDispatch();

  const handleDcreaseCart = (cartItems) => {
    dispatch(DecreasedMycart(cartItems));
  };

  const handleIncreade = (cartItems) => {
    dispatch(addToCart(cartItems));
  };
  const handleclearcart = () => {
    dispatch(clearallcart());
  };
  const handleremovefromcart = (cartItems) => {
    dispatch(RemoveFromCart(cartItems));
  };
  return (
    <div className="cartpage">
      {cart.cartItems.length === 0 ? (
        <div className="clear-cart">
          <p>Your cart is empty</p>
          <Link to="/">
            <button>Back to shop</button>
          </Link>
        </div>
      ) : (
        <div className="clear-cart">
          <button onClick={() => handleclearcart()}>Clear All Cart</button>
          <h1>My cart items</h1>
          <button>Total ${cart.cartTotalAmount}</button>
        </div>
      )}

      <div className="view-all-cart">
        <div className="cart-holders">
          <p>Product Name</p>
          <p>Product image</p>
          <p>product price</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p>Action</p>
        </div>
        {cart.cartItems?.map((cartItems) => (
          <div className="cart-holders-down" key={cartItems}>
            <p>{cartItems.product_name}</p>
            <img src={cartItems.image} alt={cartItems.product_name} />
            <p>${cartItems.price}</p>
            <p className="increased-decreased-holder">
              <button onClick={() => handleDcreaseCart(cartItems)}>-</button>
              {cartItems.cartQuantity}
              <button onClick={() => handleIncreade(cartItems)}>+</button>
            </p>

            <p>${cartItems.price * cartItems.cartQuantity}</p>
            <button
              className="delete-cart"
              onClick={() => handleremovefromcart(cartItems)}
            >
              <Delete /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cartpage;
