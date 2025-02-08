import { signUpWithEmail } from "@/lib/authentication";
import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/configs/firebaseConfig", () => ({
  auth: {},
}));

describe("signUpWithEmail", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call createUserWithEmailAndPassword with correct arguments", () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "mocked-uid" },
    });

    // 呼び出される引数の確認だけなので、待つ必要はない
    signUpWithEmail(mockEmail, mockPassword);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      mockEmail,
      mockPassword,
    );
  });
});
