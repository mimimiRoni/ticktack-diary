import { useLogInEmailUser } from "@/hooks/auth/useLogInEmailUser";
import { logInWithEmail } from "@/lib/authentication";
import { renderHook } from "@testing-library/react";
import { FirebaseError } from "firebase/app";
import { act } from "react";
import mockRouter from "next-router-mock";

jest.mock("@/lib/authentication", () => ({
  logInWithEmail: jest.fn(),
}));

describe("useLogInEmailUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should have init value", () => {
    const { result } = renderHook(() => useLogInEmailUser());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBe(null);
  });

  test("should call signInWithEmailAndPassword", async () => {
    const { result } = renderHook(() => useLogInEmailUser());
    const mockEmail = "test@test.com";
    const mockPassword = "Password123";

    await act(async () => {
      await result.current.handleLogIn(mockEmail, mockPassword);
    });

    expect(logInWithEmail).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

  test("should not have errorMessage if not throw error", async () => {
    const { result } = renderHook(() => useLogInEmailUser());

    await act(async () => {
      await result.current.handleLogIn("test@test.com", "Password123");
    });

    expect(result.current.errorMessage).toBeNull();
  });

  test("should have errorMessage if throw error auth/user-not-found", async () => {
    (logInWithEmail as jest.Mock).mockImplementation(() => {
      throw new FirebaseError("auth/user-not-found", "");
    });

    const { result } = renderHook(() => useLogInEmailUser());

    await act(async () => {
      await result.current.handleLogIn("test@test.com", "Password123");
    });

    expect(result.current.errorMessage).toBe(
      "メールアドレスかパスワードが間違っています",
    );
  });

  test("should have errorMessage if throw error", async () => {
    (logInWithEmail as jest.Mock).mockImplementation(() => {
      throw new Error("auth/user-not-found以外のエラー");
    });

    const { result } = renderHook(() => useLogInEmailUser());

    await act(async () => {
      await result.current.handleLogIn("test@test.com", "Password123");
    });

    expect(result.current.errorMessage).toBe("予期せぬエラーが発生しました");
  });

  test("should call router.push", async () => {
    const { result } = renderHook(() => useLogInEmailUser());

    await act(async () => {
      await result.current.handleLogIn("test@test.com", "Password123");
    });

    expect(mockRouter).toMatchObject({ asPath: "/timer" });
  });
});
