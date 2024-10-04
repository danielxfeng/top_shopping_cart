import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

const router = createBrowserRouter([
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
        path: "store/:category?", // The store page filtered by category.
        element: <Store />,
      },
      {
        path: "cart",
        element: <Cart />, // The shopping cart page.
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
