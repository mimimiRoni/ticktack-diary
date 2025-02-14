import { emailSchema, passwordSchema } from "../../src/lib/validation";

describe("validation", () => {
  describe("email", () => {
    test("should return true if the value is a valid email", async () => {
      const validEmail = "example@exampl.com";
      const result = await emailSchema.isValid(validEmail);
      expect(result).toBe(true);
    });

    test("should return false if the value is a invalid email", async () => {
      const invalidEmail = "invalid-email";
      expect(emailSchema.validate(invalidEmail)).rejects.toThrow(
        "メールアドレスの形式として認識できません",
      );
    });

    test("should return false if no value", async () => {
      expect(emailSchema.validate("")).rejects.toThrow(
        "メールアドレスを入力してください",
      );
    });
  });

  describe("password", () => {
    test("should return false if the value is not contains A-Z", async () => {
      const invalid = "12345678abc";
      expect(passwordSchema.validate(invalid)).rejects.toThrow(
        "大文字が必要です",
      );
    });

    test("should return false if the value is not contains a-z", async () => {
      const invalid = "12345678ABC";
      expect(passwordSchema.validate(invalid)).rejects.toThrow(
        "小文字が必要です",
      );
    });

    test("should return false if the value is not contains 0-9", async () => {
      const invalid = "Abcdefgh";
      expect(passwordSchema.validate(invalid)).rejects.toThrow(
        "数字が必要です",
      );
    });

    test("should return false if the value is less than 8 characters", async () => {
      const invalid = "1234";
      expect(passwordSchema.validate(invalid)).rejects.toThrow(
        "8文字以上必要です",
      );
    });

    test("should return true if the value is valid password", async () => {
      const valid = "Abcdefgh123";
      const result = await passwordSchema.isValid(valid);
      expect(result).toBe(true);
    });
  });
});
