import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import { renderHook } from "@testing-library/react";
import { onAuthStateChanged } from "firebase/auth";
import mockRouter from "next-router-mock";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));

describe("useAuth", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => mockRouter);
  });

  test("should not have user", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });
    const { result } = renderHook(() => useLoggedInUser());

    expect(result.current.loginUser).toBeNull();
  });

  test("should have user", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ emailVerified: true });
      return jest.fn();
    });
    const { result } = renderHook(() => useLoggedInUser());

    expect(result.current.loginUser).not.toBeNull();
  });

  test("should redirect login if not login", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    mockRouter.push = jest.fn();

    renderHook(() => useLoggedInUser());

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });

  test("should redirect login", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ emailVerified: false });
      return jest.fn();
    });

    mockRouter.push = jest.fn();

    renderHook(() => useLoggedInUser());

    expect(mockRouter.push).toHaveBeenCalledWith("/verify-email");
  });
});
