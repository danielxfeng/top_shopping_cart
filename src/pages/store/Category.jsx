import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  return <div> This is {category}</div>;
};

export default Category;
