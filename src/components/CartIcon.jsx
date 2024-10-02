import { Link } from "react-router-dom";
import pngShoppingCart from "../assets/shopping_cart.png";
import { useCartUpdateSign } from "../context/cartContext";
import cart from "../services/cart";

// CartIcon is a component that displays the shopping cart icon and the number of items in the cart.
const CartIcon = () => {
  // Just to update the item count when the cart changes.
  const { updateSign } = useCartUpdateSign();
  const count = cart.getItemCount();

  return (
    <div>
      <Link to="cart">
        <img src={pngShoppingCart} alt="shopping cart"></img>
      </Link>
      <div>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default CartIcon;
