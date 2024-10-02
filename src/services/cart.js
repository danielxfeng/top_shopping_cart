// Represents a product in the cart.
const CartItem = (product, quantity) => {
  return { product, quantity };
};

// Represents a shopping cart.
const Cart = () => {
  let _cart = [];
  let _itemCount = 0;

  // Read the cart from the local storage.
  const readFromLocalStorage = () => {
    _cart = JSON.parse(localStorage.getItem("cart")) || [];
  };

  // Write the cart to the local storage.
  const writeToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(_cart));
  };

  // Get the cart.
  const getCart = () => {
    return _cart;
  };

  // Update the product in the cart.
  const updateProduct = (product, quantity) => {
    _cart = _cart.filter((item) => item.product.id !== product.id);
    if (quantity > 0) {
      _cart.push(CartItem(product, quantity));
    }
    writeToLocalStorage();
    updateItemCount();
  };

  // Clear the cart.
  const clearCart = () => {
    _cart = [];
    writeToLocalStorage();
    _itemCount = 0;
  };

  // Get the subtotal of a cart item.
  const getSubTotal = (cartItem) => {
    return cartItem.product.price * cartItem.quantity;
  };

  // Get the total of the cart.
  const getTotal = () => {
    return _cart.reduce((total, cartItem) => total + getSubTotal(cartItem), 0);
  };

  // update the total number of items in the cart.
  const updateItemCount = () => {
    return _itemCount = _cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  // Get the total number of items in the cart.
  const getItemCount = () => {
    return _itemCount;
  };

  readFromLocalStorage();

  return { updateProduct, clearCart, getCart, getSubTotal, getTotal, getItemCount };
};

const cart = Cart();

export default cart;
