import { useParams } from "react-router-dom";
import { useCartUpdateSign } from "../context/cartContext";

const Store = () => {
  const { category } = useParams();
  const { setUpdateSign } = useCartUpdateSign();
  return <div> This is {category}</div>;
};

export default Store;
