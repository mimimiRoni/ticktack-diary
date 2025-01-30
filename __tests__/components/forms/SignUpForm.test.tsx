import SignUpForm from "@/components/forms/SignUpForm";
import { fireEvent, render, screen } from "@testing-library/react";

test("should render error if invalid input", () => {
  render(<SignUpForm />);

  fireEvent.submit(screen.getByRole("button"));

  expect(screen.getByText("メールアドレスは必須です"));
  expect(screen.getByText("パスワードは必須です"));
});
