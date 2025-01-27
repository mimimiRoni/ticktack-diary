import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

test("renders test", () => {
  render(<Home />);

  const testText = screen.getByText("お試し中");

  expect(testText).toBeInTheDocument();
});
