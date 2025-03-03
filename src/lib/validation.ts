import * as yup from "yup";

export const emailSchema = yup
  .string()
  .required("メールアドレスを入力してください")
  .email("メールアドレスの形式として認識できません");

export const passwordSchema = yup
  .string()
  .required("パスワードを入力してください")
  .min(8, "8文字以上必要です")
  .matches(/[A-Z]/, "大文字が必要です")
  .matches(/[a-z]/, "小文字が必要です")
  .matches(/[0-9]/, "数字が必要です");

export const signUpSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const logInSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
