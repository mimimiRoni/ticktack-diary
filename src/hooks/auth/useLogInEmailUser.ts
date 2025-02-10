import { logInWithEmail } from "@/lib/authentication";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogInEmailUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleLogIn = async (email: string, password: string) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await logInWithEmail(email, password);
      router.push("/timer");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/user-not-found"
      ) {
        setErrorMessage("メールアドレスかパスワードが間違っています");
      } else {
        setErrorMessage("予期せぬエラーが発生しました");
      }
    }

    setIsLoading(false);
  };

  return { isLoading, handleLogIn, errorMessage };
};
