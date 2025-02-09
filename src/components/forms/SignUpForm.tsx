"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { signUpSchema } from "../../lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/authentication";
import { sendEmailVerification } from "firebase/auth";

const SignUpForm = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    const userCredential = await signUpWithEmail(data.email, data.password);

    // TODO: 既に登録済みのユーザーが登録しようとしたら、メールアドレスに確認メールを送る。
    // メール認証がまだなら、認証メール
    // メール認証が済んでいるなら、「新規登録しようとしたこと」「ログインURL」「パスワード忘れたらならこちら」のような内容のメールを送る
    await sendEmailVerification(userCredential.user);
    router.push("/verify-email");
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ValidateInputField
          name="email"
          label="メールアドレス"
          type="email"
          autocomplete="username"
        />
        <PasswordField label="パスワード" />
        <button type="submit" disabled={loading}>
          Sign up
        </button>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
