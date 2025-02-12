import SignUpForm from "@/components/forms/SignUpForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { signUpWithEmail } from "@/lib/authentication";

jest.mock("@/lib/authentication", () => ({
  signUpWithEmail: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  sendEmailVerification: jest.fn(),
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (signUpWithEmail as jest.Mock).mockResolvedValue({
      user: {},
    });
  });

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

  test("should call with verify-email if button clicked with valid values", async () => {
    render(<SignUpForm />);

    const mockEmail = "test@example.com";
    const mockPassword = "Password123";

    fireEvent.change(screen.getByRole("textbox", { name: "メールアドレス" }), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "パスワード" }), {
      target: { value: mockPassword },
    });

    const button = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(signUpWithEmail).toHaveBeenCalledWith(mockEmail, mockPassword);
    });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({ asPath: "/verify-email" });
    });

    await waitFor(() => {
      expect(button).toHaveTextContent("Sign up");
    });
  });
});
