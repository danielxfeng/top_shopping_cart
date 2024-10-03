import { useRouteError, Link } from "react-router-dom";
import styles from "../styles/ErrorPage.module.css";

// To deal with the router error.
const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className={styles.error}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>Back to <Link to="/">Home</Link></p>
    </div>
  );
};

export default ErrorPage;
