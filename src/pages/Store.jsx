import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsApi from "../services/productsApi";
import cart from "../services/cart";
import { useCartUpdateSign } from "../context/cartContext";
import QuantityInput from "../components/QuantityInput";
import pngShoppingCart from "../assets/shopping_cart.png";
import styles from "../styles/Store.module.css";

// Product is a component that displays a single product.
const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { setUpdateSign } = useCartUpdateSign();
  const ref = useRef(null);

  // Deal with the loading of the image.
  const handlePicOnLoad = () => {
    if (ref.current) ref.current.style.display = "none";
  };

  // Deal with the error of the image.
  const handlePicOnError = () => {
    if (ref.current) ref.current.innerText = "Error loading image.";
  };

  // Add the product to the cart.
  const addToCart = () => {
    cart.addProduct(product, quantity);
    setUpdateSign({});
  };

  return (
    <div className={styles.product}>
      <div>
        <p ref={ref}>Loading...</p>
        <img
          className={styles.product__img}
          src={product.image}
          alt={product.title}
          onLoad={handlePicOnLoad}
          onError={handlePicOnError}
        ></img>
      </div>
      <p className={styles.price}>
        <span className={styles.currency}>€</span>
        {product.price.toFixed(2)}
      </p>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.add__to__cart}>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
        <button type="button" onClick={addToCart}>
          <img className={styles.cart__png} src={pngShoppingCart} alt="shopping cart" />
        </button>
      </div>
    </div>
  );
};

// Store is a page that displays the products of a category or all products.
const Store = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState({ status: "loading", data: [] });

  // Fetch the products of the selected category.
  useEffect(() => {
    // Handle the case where the category does not exist.
    if (category && !productsApi.getCategories().includes(category)) {
      navigate("/error", {
        replace: true,
        state: { message: `Category "${category}" not found.` },
      });
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = category
          ? await productsApi.getByCategory(category)
          : await productsApi.getAll();
        setProducts({ status: "success", data });
      } catch (error) {
        console.error(error);
        setProducts({ status: "error", data: [] });
      }
    };

    fetchProducts();
  }, [category, navigate]);

  if (products.status === "loading") return <div>Loading...</div>;
  if (products.status === "error") return <div className="error">Error loading products.</div>;

  return (
    <div>
      <h1>Store</h1>
      <div className={styles.container}>
        {products.data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;
