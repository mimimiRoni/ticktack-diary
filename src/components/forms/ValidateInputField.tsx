"use client";

import { useFormContext } from "react-hook-form";

type ValidateInputFieldProps = {
  name: string;
  label: string;
  type?: string;
  autocomplete?: string;
};

const ValidateInputField = ({
  name,
  label,
  type = "text",
  autocomplete,
}: ValidateInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoComplete={autocomplete}
        role="textbox"
      ></input>
      {errors[name] && (
        <p role="alert" aria-label={name + "-input-error"}>
          {errors[name].message?.toString()}
        </p>
      )}
    </>
  );
};

export default ValidateInputField;
