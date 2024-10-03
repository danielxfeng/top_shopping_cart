import { useRef } from "react";

// This component is used to input quantity of a product
const QuantityInput = ({ quantity, setQuantity }) => {
  const ref = useRef(null);

  // Add the quantity of the item.
  const add = () => {
    setQuantity(quantity + 1);
    ref.current.classList.remove("show");
  };

  // Subtract the quantity of the item. Cannot be less than 0.
  const subtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      ref.current.classList.add("show");
    }
  };

    // Input the quantity of the item.
  const inputQuantity = (value) => {
    const number = parseInt(value, 10);
    if (!isNaN(number) && number > 0) {
      setQuantity(number);
      ref.current.classList.remove("show");
    } else {
      ref.current.classList.add("show");
    }
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => inputQuantity(e.target.value)}
      />
      <p ref={ref}>
        Please input a valid number that greater than 0.
      </p>
      <button type="button" onClick={subtract}>
        -
      </button>
      {quantity}
      <button type="button" onClick={add}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
