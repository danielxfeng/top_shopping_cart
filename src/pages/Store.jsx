import { useParams } from "react-router-dom";

const Store = () => {
  const { category } = useParams();
  return <div> This is {category}</div>;
};

export default Store;
