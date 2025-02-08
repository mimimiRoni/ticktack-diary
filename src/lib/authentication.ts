import { auth, db } from "@/configs/firebaseConfig";
import { DraftUser } from "@/types/DraftUser.type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  // TODO: 既に登録済みのユーザーが登録しようとしたら、メールアドレスに確認メールを送る。
  // メール認証がまだなら、認証メール
  // メール認証が済んでいるなら、「新規登録しようとしたこと」「ログインURL」「パスワード忘れたらならこちら」のような内容のメールを送る

  // Firestoreに仮ユーザーとして登録し、TTLで24時間以内にメールアドレス認証が完了しなければFirestroreとAuthから削除する
  const draftUser: DraftUser = {
    email: email,
    verified: false,
    createdAt: new Date(Date.now()),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  await setDoc(doc(db, "users", userCredential.user.uid), {
    ...draftUser,
    createdAt: Timestamp.fromDate(draftUser.createdAt),
    expiresAt: Timestamp.fromDate(draftUser.expiresAt!),
  });

  return userCredential;
};
