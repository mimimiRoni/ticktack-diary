import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "../../../src/components/forms/SignUpForm";
import { useRegisterEmailUser } from "@/hooks/auth/useRegisterEmailUser";

jest.mock("@/hooks/auth/useRegisterEmailUser");

describe("SignUpForm", () => {
  const mockHandleRegister = jest.fn();
  const mockIsLoading = false;

  beforeEach(() => {
    jest.resetAllMocks();
    (useRegisterEmailUser as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      isLoading: mockIsLoading,
    });
  });

  test("renders the form fields correctly", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  test("submits the form with email and password", async () => {
    render(<SignUpForm />);
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "Password123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith(
        "test@example.com",
        "Password123",
      );
    });
  });

  test("disables the button when loading", () => {
    (useRegisterEmailUser as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      isLoading: true,
    });
    render(<SignUpForm />);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });
});
