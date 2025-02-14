import { fireEvent, render, screen } from "@testing-library/react";
import PasswordField from "../../../src/components/forms/PasswordField";
import { useForm, FormProvider } from "react-hook-form";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("PasswordField", () => {
  test("should render input field", () => {
    render(
      <Wrapper>
        <PasswordField label="password"></PasswordField>
      </Wrapper>,
    );

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveAttribute("type", "password");

    const toggleDisplayPassword = screen.getByRole("checkbox");

    // クリックすると、パスワードが表示されるようになる
    fireEvent.click(toggleDisplayPassword);
    expect(inputElement).toHaveAttribute("type", "text");

    // もう一回クリックするとまたパスワード非表示になる
    fireEvent.click(toggleDisplayPassword);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("should render toggle label", () => {
    render(
      <Wrapper>
        <PasswordField label="password"></PasswordField>
      </Wrapper>,
    );

    // 最初はパスワードは非表示
    expect(screen.getByText("パスワードを表示する")).toBeVisible();

    // トグルクリックで表示になる
    const inputElement = screen.getByRole("checkbox");
    fireEvent.click(inputElement);

    expect(screen.getByText("パスワードを表示しています")).toBeVisible();
  });
});
