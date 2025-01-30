"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PasswordFieldProps = {
  name: string;
  label: string;
};

const PasswordField = ({ name, label }: PasswordFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label>{label}</label>
      <input
        {...register}
        name={name}
        type={visible ? "text" : "password"}
        role="textbox"
      />
      <input
        type="checkbox"
        role="checkbox"
        aria-checked={visible}
        onClick={() => {
          setVisible((pre) => !pre);
        }}
      />
      <label>
        {visible ? "パスワードを表示しています" : "パスワードを表示する"}
      </label>
      {errors[name] && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
};

export default PasswordField;
