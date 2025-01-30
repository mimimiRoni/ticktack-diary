import * as yup from "yup";

export const emailScheme = yup
  .string()
  .required("メールアドレスを入力してください")
  .email("メールアドレスの形式として認識できません");

export const passwordSchema = yup
  .string()
  .min(8, "8文字以上必要です")
  .matches(/[A-Z]/, "大文字を含めてください")
  .matches(/[a-z]/, "小文字を含めてください")
  .matches(/[0-9]/, "数字を含めてください")
  .required("パスワードは必須です");
