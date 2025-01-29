import * as yup from "yup";

export const emailScheme = yup
  .string()
  .required("メールアドレスを入力してください")
  .email("メールアドレスの形式として認識できません");
