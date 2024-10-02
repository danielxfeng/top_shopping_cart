import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// CartProvider is a component that provides the cart context to its children.
const CartProvider = ({ children }) => {
  const [updateSign, setUpdateSign] = useState({});

  return (
    <CartContext.Provider value={{ updateSign, setUpdateSign }}>
      {children}
    </CartContext.Provider>
  );
}

// The custom hook for easily accessing the context.
const useCartUpdateSign = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCartUpdateSign };
