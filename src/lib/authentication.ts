import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);

  // TODO: Firestoreに仮ユーザーとして登録し、TTLで24時間以内にメールアドレス認証が完了しなければFirestroreとAuthから削除する
};
