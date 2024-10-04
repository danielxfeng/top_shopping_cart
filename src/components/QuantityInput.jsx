import { useRef } from "react";
import styles from "../styles/QuantityInput.module.css";

// This component is used to input quantity of a product
const QuantityInput = ({ quantity, setQuantity }) => {
  const ref = useRef(null);

  // Add the quantity of the item.
  const add = () => setQuantity(quantity + 1);

  // Subtract the quantity of the item. Cannot be less than 0.
  const subtract = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Input the quantity of the item.
  const inputQuantity = (value) => {
    const number = parseInt(value, 10);
    if (!isNaN(number) && number > 0) setQuantity(number);
  };

  return (
    <div className={styles.qi}>
      <button type="button" onClick={subtract}>
        -
      </button>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => inputQuantity(e.target.value)}
      />
      <button type="button" onClick={add}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
