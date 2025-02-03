"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PasswordFieldProps = {
  label: string;
};

const PasswordField = ({ label }: PasswordFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [visible, setVisible] = useState(false);
  const name = "password";

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
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
          {errors[name].message?.toString()}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
