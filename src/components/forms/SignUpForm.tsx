"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { signUpSchema } from "../../lib/validation";
import { useRegisterEmailUser } from "@/hooks/auth/useRegisterEmailUser";
import Button from "../common/Button/Button";

const SignUpForm = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  });
  const { handleRegister, isLoading } = useRegisterEmailUser();

  const onSubmit = async (data: { email: string; password: string }) => {
    await handleRegister(data.email, data.password);
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
        <Button disabled={isLoading}>Sign up</Button>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
