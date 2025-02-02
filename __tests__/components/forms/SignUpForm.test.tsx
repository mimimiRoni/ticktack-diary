import SignUpForm from "@/components/forms/SignUpForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

test("should render error if invalid input", async () => {
  render(<SignUpForm />);

  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByText("メールアドレスを入力してください"));
    expect(screen.getByText("パスワードを入力してください"));
  });
});
