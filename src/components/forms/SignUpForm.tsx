"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { signUpSchema } from "../../lib/validation";

const SignUpForm = () => {
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <ValidateInputField
          name="email"
          label="メールアドレス"
          type="email"
          autocomplete="username"
        />
        <PasswordField name="password" label="パスワード" />
        <button type="submit">Sign up</button>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
