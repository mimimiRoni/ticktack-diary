import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
  // TODO: 既に登録済みのユーザーが登録しようとしたら、メールアドレスに確認メールを送る。
  // メール認証がまだなら、認証メール
  // メール認証が済んでいるなら、「新規登録しようとしたこと」「ログインURL」「パスワード忘れたらならこちら」のような内容のメールを送る
  // TODO: Firestoreに仮ユーザーとして登録し、TTLで24時間以内にメールアドレス認証が完了しなければFirestroreとAuthから削除する
};
