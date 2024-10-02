import { Link } from "react-router-dom";
import Nav from "./Nav";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Fancy Shopping Center</h1>
        </Link>
        <Nav />
      </div>
      <CartIcon />
    </header>
  );
};

export default Header;
