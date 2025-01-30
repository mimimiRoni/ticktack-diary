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
      <label>{label}</label>
      <input
        {...register(name)}
        type={type}
        autoComplete={autocomplete}
        role="textbox"
      ></input>
      {errors[name] && <p>{errors[name].message?.toString()}</p>}
    </>
  );
};

export default ValidateInputField;
