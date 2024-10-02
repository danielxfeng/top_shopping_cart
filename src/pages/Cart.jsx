import { useState } from "react";
import cart from "../services/cart";
import { useCartUpdateSign } from "../context/cartContext";

// CartItem is a component that displays a single item in the shopping cart.
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { setUpdateSign } = useCartUpdateSign();

  if (quantity === 0) return null;

  // Add the quantity of the item.
  const add = () => {
    setQuantity(quantity + 1);
  };

  // Subtract the quantity of the item. Cannot be less than 1.
  const substract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Update the quantity of the item.
  const update = () => {
    if (quantity !== item.quantity) {
      cart.updateProduct(item.product, quantity);
      setUpdateSign({});
    }
  };

  // Remove the item from the cart.
  const remove = () => {
    cart.updateProduct(item.product, 0);
    setQuantity(0);
    setUpdateSign({});
  };

  return (
    <tr>
      <td>{item.product.name}</td>
      <td>
        <span>€</span>
        {item.product.price.toFixed(2)}
      </td>
      <td>
        <button type="button" onClick={() => substract()}>
          -
        </button>
        {quantity}
        <button type="button" onClick={() => add()}>
          +
        </button>
      </td>
      <td>
        <span>€</span>
        {cart.getSubTotal(item).toFixed(2)}
      </td>
      <td>
        <button type="button" onClick={() => update()}>
          Update
        </button>
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
      setResult(`Successful! Your order ID is ${res.id}`);
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
