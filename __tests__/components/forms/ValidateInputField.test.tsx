import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import ValidateInputFiled from "../../../src/components/forms/ValidateInputField";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ValidateInputField", () => {
  test("should render input field", () => {
    render(
      <Wrapper>
        <ValidateInputFiled
          name="email"
          label="メールアドレス"
          type="email"
          autocomplete="email"
        />
      </Wrapper>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
  });
});
