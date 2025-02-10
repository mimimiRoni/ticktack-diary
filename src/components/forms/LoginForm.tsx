import { logInSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";
import { useLogInEmailUser } from "@/hooks/auth/useLogInEmailUser";

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
        <button type="submit" disabled={isLoading}>
          Log in
        </button>
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
