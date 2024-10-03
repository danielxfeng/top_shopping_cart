import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

// The home page, just a static page with some text.
const Home = () => {
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref1.current.classList.add(styles.ok);
      ref2.current.classList.add(styles.ok);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.home}>
      <h1 ref={ref1} className={styles.left}>Welcome</h1>
      <section ref={ref2} className={styles.content}>
        <p>
          We are thrilled to welcome you to our store, your one-stop destination
          for all your shopping needs! Whether you're looking for the latest
          electronics, stylish clothing, or unique gifts, we've got you covered
          with a wide range of high-quality products at unbeatable prices.
        </p>
        <p>
          At our store, we strive to provide an exceptional shopping experience
          with an easy-to-navigate store, fast and secure checkout, and a team
          of customer service experts ready to assist you with any questions.
        </p>
        <p>
          Enjoy browsing through our carefully curated collections, and don’t
          forget to check out the exclusive deals available in each category!
        </p>
        <p className={styles.bold}>Happy Shopping!</p>
      </section>
    </div>
  );
};

export default Home;
