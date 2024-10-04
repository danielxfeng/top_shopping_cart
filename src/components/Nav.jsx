import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import productsApi from "../services/productsApi";
import styles from "../styles/Header.module.css";

const Categories = () => {
  return (
    <ul className={styles.nav__secondary__ul}>
      {productsApi.getCategories().map((category) => (
        <li key={category}>
          <Link to={`store/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
};

const Nav = () => {
  const [hoverStore, setHoverStore] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const ref = useRef();

  useEffect(() => {
    hoverStore || hoverSecondary
      ? ref.current.classList.add(styles.show)
      : ref.current.classList.remove(styles.show);
  }, [hoverStore, hoverSecondary]);

  const handleHoverStore = (isShow) => setHoverStore(isShow);
  const handleHoverSecondary = (isShow) => setHoverSecondary(isShow);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link className={styles.nav__primary} to="/">
            Home
          </Link>
        </li>
        <li>
          <div className={styles.nav__dropdown}>
            <Link
              className={styles.nav__primary}
              to="store"
              onMouseEnter={() => handleHoverStore(true)}
              onMouseLeave={() => handleHoverStore(false)}
            >
              Store<span className={styles.drop__down__sign}>⌵</span>
            </Link>
            <div
              ref={ref}
              className={styles.nav__secondary}
              onMouseEnter={() => handleHoverSecondary(true)}
              onMouseLeave={() => handleHoverSecondary(false)}
            >
              <Categories />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
