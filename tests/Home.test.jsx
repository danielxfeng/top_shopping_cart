import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home";

describe("Home page", () => {
  it("renders correct", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("renders the title", () => {
    render(<Home />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("renders the content", () => {
    render(<Home />);
    expect(screen.getByText("Happy Shopping!")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Home />);
    expect(screen.getByText(/We are thrilled/i)).toBeInTheDocument();
  });
});
