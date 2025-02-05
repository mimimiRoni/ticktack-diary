import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // TODO: Firestoreに仮ユーザーとして登録し、TTLで24時間以内にメールアドレス認証が完了しなければFirestroreとAuthから削除する
  // 登録中ボタンの動作確認がしやすいように雑に待機
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await sendEmailVerification(userCredential.user);
};
