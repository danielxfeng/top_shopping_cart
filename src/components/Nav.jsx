import { Link } from "react-router-dom";
import productsApi from "../services/productsApi";

const Categories = () => {
  return (
    <ul>
      {productsApi.getCategories().map((category) => (
        <li key={category}>
          <Link to={`store/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="store">
            Store<span>⌵</span>
          </Link>
        </li>
      </ul>
      <Categories />
    </nav>
  );
};

export default Nav;
