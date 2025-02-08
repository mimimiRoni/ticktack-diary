"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { signUpSchema } from "../../lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/authentication";

const SignUpForm = () => {
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    await signUpWithEmail(data.email, data.password);
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
