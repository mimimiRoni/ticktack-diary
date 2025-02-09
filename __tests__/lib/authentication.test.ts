import { signUpWithEmail } from "@/lib/authentication";
import { auth, db } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { waitFor } from "@testing-library/dom";
import { FirebaseError } from "firebase/app";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
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

  test("should call setDoc with created user id", async () => {
    const mockId = "mocked-uid";
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: mockId },
    });

    const mockStoreData = {
      email: mockEmail,
      verified: false,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    await signUpWithEmail(mockEmail, mockPassword);

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(doc(db, "users", mockId), {
        ...mockStoreData,
        createdAt: Timestamp.fromDate(mockStoreData.createdAt),
        expiresAt: Timestamp.fromDate(mockStoreData.expiresAt!),
      });
    });
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
