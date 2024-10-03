import { useState, useEffect } from "react";
import cart from "../services/cart";
import { useCartUpdateSign } from "../context/cartContext";
import QuantityInput from "../components/QuantityInput";
import styles from "../styles/Cart.module.css";

// CartItem is a component that displays a single item in the shopping cart.
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { setUpdateSign } = useCartUpdateSign();

  // Update the cart when the quantity changes.
  useEffect(() => {
    if (quantity === item.quantity) return;
    cart.updateProduct(item.product, quantity);
    setUpdateSign({});
  }, [quantity]);

  if (quantity === 0) return null;

  // Remove the item from the cart.
  const remove = () => setQuantity(0);

  return (
    <tr>
      <td className={styles.product__description}>
        <img className={styles.product__img} src={item.product.image} alt={item.product.title} />
        <span>{item.product.title}</span>
      </td>
      <td>
        <span className={styles.currency}>€</span>
        {item.product.price.toFixed(2)}
      </td>
      <td>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      </td>
      <td>
        <span className={styles.currency}>€</span>
        {cart.getSubTotal(item).toFixed(2)}
      </td>
      <td>
        <button className={styles.btn__remove} type="button" onClick={() => remove()}>
          Remove
        </button>
      </td>
    </tr>
  );
};

// Cart is a page that displays the shopping cart.
const Cart = () => {
  const { updateSign, setUpdateSign } = useCartUpdateSign();
  const [result, setResult] = useState("");

  // Checkout the cart.
  const checkout = async () => {
    if (cart.getItemCount() === 0) return;
    try {
      const res = await cart.checkout();
      cart.clearCart();
      setResult(`Success! Your order ID is ${res.id}`);
      setUpdateSign({});
    } catch (err) {
      setResult("Failed, please retry later.");
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className={styles.container}>
        <section className={styles.cart}>
          <table>
            <caption>Check your shopping cart here:</caption>
            <thead>
              <tr>
                <th className={styles.head__product}>Product</th>
                <th className={styles.head__item}>Price</th>
                <th className={styles.head__item}>Quantity</th>
                <th className={styles.head__item}>Subtotal</th>
                <th className={styles.head__item}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.getItemCount() === 0 && (
                <tr>
                  <td className={"error"} colSpan="3">Your cart is empty.</td>
                </tr>
              )}
              {cart.getCart().map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total:</td>
                <td>
                  <span className={styles.currency}>€</span>
                  {cart.getTotal().toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
        <aside className={styles.summary}>
          <h2>Summary</h2>
          <p>
            <span className={styles.currency}>Total €</span>
            {cart.getTotal().toFixed(2)}
          </p>
          <button type="button" onClick={() => checkout()}>
            Checkout
          </button>
          <div>
            <p className="error">{result}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
