import { useState, useEffect } from "react";
import cart from "../services/cart";
import { useCartUpdateSign } from "../context/cartContext";
import QuantityInput from "../components/QuantityInput";

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
      <td>
        <img src={item.product.image} alt={item.product.title} />
        {item.product.title}
      </td>
      <td>
        <span>€</span>
        {item.product.price.toFixed(2)}
      </td>
      <td>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      </td>
      <td>
        <span>€</span>
        {cart.getSubTotal(item).toFixed(2)}
      </td>
      <td>
        <button type="button" onClick={() => remove()}>
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
      <section>
        <table>
          <caption>Check your shopping cart here:</caption>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.getItemCount() === 0 && (
              <tr>
                <td colSpan="3">Your cart is empty.</td>
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
                <span>€</span>
                {cart.getTotal().toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      <aside>
        <h2>Cart Summary</h2>
        <p>
          <span>€</span>
          {cart.getTotal().toFixed(2)}
        </p>
        <button type="button" onClick={() => checkout()}>
          Checkout
        </button>
      </aside>
      <div>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Cart;
