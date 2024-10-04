import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../src/context/cartContext";
import Store from "../src/pages/Store";
import productsApi from "../src/services/productsApi";
import cart from "../src/services/cart";

vi.mock("../src/services/productsApi");
vi.mock("../src/services/cart");

describe("Store Page", () => {
  it("navigates to error page for invalid category", async () => {
    productsApi.getCategories.mockReturnValue(["electronics", "books"]);

    render(
      <MemoryRouter initialEntries={["/store/invalid-category"]}>
        <Routes>
          <Route path="store/:category" element={<Store />} />
          <Route path="error" element={<div>Error Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error Page/i)).toBeInTheDocument()
    );
  });

  it("shows error message if products loading fails", async () => {
    productsApi.getByCategory.mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter initialEntries={["/store/electronics"]}>
        <Routes>
          <Route path="store/:category" element={<Store />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error loading products/i)).toBeInTheDocument()
    );
  });

  it("renders the h1 element and products content", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 10, image: "/product1.png" },
      { id: 2, title: "Product 2", price: 20, image: "/product2.png" },
    ];
    productsApi.getByCategory.mockResolvedValue(mockProducts);
    const contextValue = { updateSign: {} };

    render(
      <CartProvider value={contextValue}>
        <MemoryRouter initialEntries={["/store/electronics"]}>
          <Routes>
            <Route path="store/:category" element={<Store />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Store"
      );
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});

describe("Product", () => {
  it("renders product details correctly (image, title, price)", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 10, image: "/product1.png" },
      { id: 2, title: "Product 2", price: 20, image: "/product2.png" },
    ];
    productsApi.getByCategory.mockResolvedValue(mockProducts);
    const contextValue = { updateSign: {} };

    render(
      <CartProvider value={contextValue}>
        <MemoryRouter initialEntries={["/store/electronics"]}>
          <Routes>
            <Route path="store/:category" element={<Store />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      // Check product title
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();

      // Check product prices
      expect(screen.getByText(/€10\.00/)).toBeInTheDocument();
      expect(screen.getByText(/€20\.00/)).toBeInTheDocument();

      // Check product images
      expect(screen.getByAltText("Product 1")).toHaveAttribute(
        "src",
        "/product1.png"
      );
      expect(screen.getByAltText("Product 2")).toHaveAttribute(
        "src",
        "/product2.png"
      );
    });
  });

  it("handles quantity increment and decrement", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 10, image: "/product1.png" },
    ];
    productsApi.getByCategory.mockResolvedValue(mockProducts);
    const contextValue = { updateSign: {} };

    render(
      <CartProvider value={contextValue}>
        <MemoryRouter initialEntries={["/store/electronics"]}>
          <Routes>
            <Route path="store/:category" element={<Store />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Wait for product to be loaded
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Check initial quantity
    const quantityInput = screen.getByRole("spinbutton");
    expect(quantityInput).toHaveValue(1);

    // Increment quantity
    const incrementButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(incrementButton);
    expect(quantityInput).toHaveValue(2);

    // Decrement quantity
    const decrementButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
  });

  it("adds product to the cart", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 10, image: "/product1.png" },
    ];
    productsApi.getByCategory.mockResolvedValue(mockProducts);
    const contextValue = { updateSign: {} };

    render(
      <CartProvider value={contextValue}>
        <MemoryRouter initialEntries={["/store/electronics"]}>
          <Routes>
            <Route path="store/:category" element={<Store />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Wait for product to be loaded
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Mock addProduct function from cart service
    const addProductSpy = vi.spyOn(cart, "addProduct");

    // Add product to cart
    const addToCartButton = screen.getByRole("button", {
      name: /shopping cart/i,
    });
    fireEvent.click(addToCartButton);

    // Check if the addProduct function was called with correct arguments
    expect(addProductSpy).toHaveBeenCalledWith(mockProducts[0], 1);
  });
});
