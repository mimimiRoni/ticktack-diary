import { signUpWithEmail } from "@/lib/authentication";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegisterEmailUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signUpWithEmail(email, password);
      await sendEmailVerification(userCredential.user);
      router.push("/verify-email");
    } catch {
      // TODO: 既に登録済みのユーザーが登録しようとしたら、メールアドレスに確認メールを送る。
      // メール認証がまだなら、認証メール
      // メール認証が済んでいるなら、「新規登録しようとしたこと」「ログインURL」「パスワード忘れたらならこちら」のような内容のメールを送る
      return false;
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  return { handleRegister, isLoading };
};
