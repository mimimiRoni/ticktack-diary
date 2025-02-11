import { logInWithEmail, signUpWithEmail } from "@/lib/authentication";
import { auth } from "@/configs/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/configs/firebaseConfig", () => ({
  auth: {},
}));

jest.mock("firebase/firestore", () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
  Timestamp: {
    fromDate: jest.fn(),
  },
}));

const mockEmail = "test@example.com";
const mockPassword = "password123";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("signUpWithEmail", () => {
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

  test("should throw error", async () => {
    const error = new FirebaseError(
      "auth/email-already-exists",
      "The email address is already in use by another account.",
    );

    (createUserWithEmailAndPassword as jest.Mock).mockImplementation(() => {
      throw error;
    });

    expect(signUpWithEmail(mockEmail, mockPassword)).rejects.toThrow(error);
  });
});

describe("logInWithEmail", () => {
  test("should call signInWithEmailAndPassword", () => {
    logInWithEmail(mockEmail, mockPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      mockEmail,
      mockPassword,
    );
  });

  test("should throw error", async () => {
    const error = new FirebaseError("auth/user-not-found", "");

    (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
      throw error;
    });

    expect(logInWithEmail(mockEmail, mockPassword)).rejects.toThrow(error);
  });
});
