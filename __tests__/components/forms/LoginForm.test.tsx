import LoginForm from "@/components/forms/LoginForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("LoginForm", () => {
  test("should render error if invalid input", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("alert", { name: "email-input-error" }),
      ).not.toBeNull();

      expect(
        screen.queryByRole("alert", { name: "password-input-error" }),
      ).not.toBeNull();
    });
  });

  test("should not render error if valid input", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByRole("textbox", { name: "メールアドレス" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "パスワード" }), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("alert", { name: "email-input-error" }),
      ).toBeNull();

      expect(
        screen.queryByRole("alert", { name: "password-input-error" }),
      ).toBeNull();
    });
  });
});
