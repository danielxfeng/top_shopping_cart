import { Link } from "react-router-dom";
import pngShoppingCart from "../assets/shopping_cart.png";
import { useCartUpdateSign } from "../context/cartContext";
import cart from "../services/cart";
import styles from "../styles/Header.module.css";

// CartIcon is a component that displays the shopping cart icon and the number of items in the cart.
const CartIcon = () => {
  // Just to update the item count when the cart changes.
  const { updateSign } = useCartUpdateSign();
  const count = cart.getItemCount();

  return (
    <div className={styles.cart}>
      <Link to="cart">
        <img
          className={styles.cart__png}
          src={pngShoppingCart}
          alt="shopping cart"
        ></img>
        {count > 0 ? (
          <div className={styles.cart__badge}>
            <p>{count}</p>
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default CartIcon;
