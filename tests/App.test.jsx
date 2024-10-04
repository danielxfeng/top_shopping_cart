import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { CartProvider } from "../src/context/cartContext";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

describe("App page", () => {
  it("renders correctly", async () => {
    const contextValue = { updateSign: {} };
    const { container } = render(
      <MemoryRouter>
        <CartProvider value={contextValue}>
          <App />
        </CartProvider>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(/Home/i));
    expect(container).toMatchSnapshot();
  });
});
