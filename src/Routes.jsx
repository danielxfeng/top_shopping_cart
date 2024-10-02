import { useRoutes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Store from "./pages/store/Store";
import Category from "./pages/store/Category";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <App />, // The root element of the app, including the layout, header, and footer.
      errorElement: <ErrorPage />, // The error page to display when a route fails.
      children: [
        {
          path: "/",
          element: <Home />, // The home page.
        },
        {
          path: "store",
          element: <Store />, // The store page, which includes all the products.
        },
        {
          path: "store/:category", // The store page filtered by category.
          element: <Category />,
        },
        {
          path: "cart",
          element: <Cart />, // The shopping cart page.
        },
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
