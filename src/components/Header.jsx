import { Link } from "react-router-dom";
import Nav from "./Nav";
import CartIcon from "./CartIcon";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link className={styles.title} to="/">
          <p>Fancy Mall</p>
        </Link>
        <Nav />
      </div>
      <CartIcon className={styles.cart__icon} />
    </header>
  );
};

export default Header;
