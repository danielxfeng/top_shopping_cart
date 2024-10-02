import { useState } from "react";
import cart from "../services/cart";
import { useCartUpdateSign } from "../context/cartContext";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { setUpdateSign } = useCartUpdateSign();

  if (quantity === 0) return null;

  const add = () => {
    setQuantity(quantity + 1);
  };

  const substract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const update = () => {
    if (quantity !== item.quantity) {
      cart.updateProduct(item.product, quantity);
      setUpdateSign({});
    }
  }

  const remove = () => {
    cart.updateProduct(item.product, 0);
    setQuantity(0);
    setUpdateSign({});
  };

  return (
    <tr key={item.product.id}>
      <td>{item.product.name}</td>
      <td>
        <span>€</span>
        {item.product.price.toFixed(2)}
      </td>
      <td>
        <button type="button" onClick={()=>substract()}>-</button>
        {quantity}
        <button type="button" onClick={()=>add()}>+</button>
      </td>
      <td>
        <span>€</span>
        {cart.getSubTotal(item).toFixed(2)}
      </td>
      <td>
        <button type="button" onClick={()=>update()}>Update</button>
        <button type="button" onClick={()=>remove()}>Remove</button>
      </td>
    </tr>
  );
};

const Cart = () => {
  const { setUpdateSign } = useCartUpdateSign();

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
              <CartItem item={item} />
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
        <p><span>€</span>{cart.getTotal().toFixed(2)}</p>
        <button type="button">Checkout</button>
      </aside>
    </div>
  );
};

export default Cart;
