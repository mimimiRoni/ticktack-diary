import { logInSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormProvider, useForm } from "react-hook-form";
import ValidateInputField from "./ValidateInputField";
import PasswordField from "./PasswordField";

const LoginForm = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(logInSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <ValidateInputField
          name="email"
          label="メールアドレス"
          type="email"
          autocomplete="username"
        />
        <PasswordField label="パスワード" />
        <button type="submit">Log in</button>
      </Form>
    </FormProvider>
  );
};

export default LoginForm;
