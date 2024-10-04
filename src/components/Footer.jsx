import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span>&copy; 2024</span>
        <a
          href="https://github.com/danielxfeng/top_shopping_cart"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fancy Mall
        </a>
      </p>
      <p>
        Made by ❤️<em>Daniel</em>❤️
      </p>
    </footer>
  );
};

export default Footer;
