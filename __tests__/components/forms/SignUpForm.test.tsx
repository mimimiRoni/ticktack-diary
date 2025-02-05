import SignUpForm from "@/components/forms/SignUpForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

describe("SignUpForm", () => {
  test("should render error if invalid input", async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText("メールアドレスを入力してください"),
      ).toBeVisible();
      expect(screen.getByText("パスワードを入力してください")).toBeVisible();
    });
  });

  test("should not have error if input is valid", async () => {
    render(<SignUpForm />);

    fireEvent.input(screen.getByRole("textbox", { name: "メールアドレス" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByRole("textbox", { name: "パスワード" }), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

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
