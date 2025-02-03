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
      <label htmlFor={name}>{label}</label>
      <input
        {...register}
        name={name}
        id={name}
        type={visible ? "text" : "password"}
        role="textbox"
        autoComplete="current-password"
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
      {errors[name] && (
        <p role="alert" aria-label="password-input-error">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
