import { useRegisterEmailUser } from "@/hooks/auth/useRegisterEmailUser";
import { signUpWithEmail } from "@/lib/authentication";
import { renderHook } from "@testing-library/react";
import { FirebaseError } from "firebase/app";
import { act } from "react";
import mockRouter from "next-router-mock";
import { getIdToken } from "firebase/auth";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

jest.mock("@/lib/authentication", () => ({
  signUpWithEmail: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  sendEmailVerification: jest.fn(),
  getIdToken: jest.fn(),
}));

const mockGetIdToken = getIdToken as jest.Mock;

describe("useRegisterEmailUser", () => {
  const mockEmail = "test@test.com";
  const mockPassword = "Password123";

  beforeEach(() => {
    jest.resetAllMocks();
    mockGetIdToken.mockResolvedValue("mockToken");
  });

  test("should have init values", async () => {
    const { result } = renderHook(() => useRegisterEmailUser());

    expect(result.current.isLoading).toBe(false);
  });

  test("should return true with valid arguments", async () => {
    (signUpWithEmail as jest.Mock).mockResolvedValue({ user: {} });
    const { result } = renderHook(() => useRegisterEmailUser());

    await act(async () => {
      const success = await result.current.handleRegister(
        mockEmail,
        mockPassword,
      );

      expect(success).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
  });

  test("should return false with invalid arguments", async () => {
    (signUpWithEmail as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    const { result } = renderHook(() => useRegisterEmailUser());

    await act(async () => {
      const success = await result.current.handleRegister(
        "invalid-email",
        "invalid-pass",
      );

      expect(success).toBe(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  test("should call router.push if error", async () => {
    (signUpWithEmail as jest.Mock).mockImplementation(() => {
      throw new FirebaseError("auth/email-already-exists", "");
    });

    const { result } = renderHook(() => useRegisterEmailUser());

    await act(async () => {
      await result.current.handleRegister(mockEmail, mockPassword);
    });

    expect(mockRouter).toMatchObject({ asPath: "/verify-email" });
  });
});
