import { Link } from "react-router-dom";
import pngShoppingCart from "../assets/shopping_cart.png";

const CartIcon = () => {
  return (
    <div>
      <Link to="cart">
        <img src={pngShoppingCart} alt="shopping cart"></img>
      </Link>
      <div>
        <p>0</p>
      </div>
    </div>
  );
};

export default CartIcon;
