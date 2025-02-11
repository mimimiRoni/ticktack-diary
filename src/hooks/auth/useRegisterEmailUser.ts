import { signUpWithEmail } from "@/lib/authentication";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { appOrigin } from "@/configs/appConfig";

export const useRegisterEmailUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signUpWithEmail(email, password);
      await sendEmailVerification(userCredential.user, {
        url: `${appOrigin}/login/`,
      });
      router.push("/verify-email");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-exists"
      ) {
        // TODO: 既に登録済みのユーザーが登録しようとしたら、メールアドレスに確認メールを送る。
        // →「新規登録しようとしたこと」「ログインURL」「パスワード忘れたらならこちら」のような内容のメールを送る
        router.push("/verify-email");
      }

      return false;
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  return { handleRegister, isLoading };
};
