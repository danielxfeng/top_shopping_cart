import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";

describe("Footer page", () => {
  it("renders correct", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("renders the content1", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
  });

  it("renders the content2", () => {
    render(<Footer />);
    expect(screen.getByText(/Daniel/i)).toBeInTheDocument();
  });

  it("renders an external link with correct href", () => {
    render(<Footer />);
    const linkElement = screen.getByText("Fancy Mall");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://github.com/danielxfeng/top_shopping_cart");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });
});
