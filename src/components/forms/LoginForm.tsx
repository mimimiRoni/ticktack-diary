import { logInSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { useLogInEmailUser } from "@/hooks/auth/useLogInEmailUser";
import Button from "../common/Button/Button";

const LoginForm = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(logInSchema),
  });

  const { isLoading, handleLogIn, errorMessage } = useLogInEmailUser();

  const onSubmit = async (data: { email: string; password: string }) => {
    await handleLogIn(data.email, data.password);
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
        <Button disabled={isLoading}>Log in</Button>
        {errorMessage && (
          <p role="alert" aria-label="submit-error">
            {errorMessage}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
