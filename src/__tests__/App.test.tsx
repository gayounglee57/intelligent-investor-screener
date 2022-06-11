import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("<App/>", () => {
  it("renders titles", () => {
    render(<App />);
    const title = screen.getByText(/be intelligent/i);
    const subtitle = screen.getByText(/enter a ticker symbol/i);
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/eg. goog/i);
    expect(input).toBeInTheDocument();
  });

  it("takes input and renders Loading state", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/eg. goog/i);
    userEvent.type(input, "goog");
    userEvent.type(input, "{enter}");
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
