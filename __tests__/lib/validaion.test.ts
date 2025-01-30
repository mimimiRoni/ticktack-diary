import { emailScheme, passwordSchema } from "../../src/lib/validation";

describe("email", () => {
  test("should return true if the value is a valid email", async () => {
    const validEmail = "example@exampl.com";
    const result = await emailScheme.isValid(validEmail);
    expect(result).toBe(true);
  });

  test("should return false if the value is a invalid email", async () => {
    const invalidEmail = "invalid-email";
    const result = await emailScheme.isValid(invalidEmail);
    expect(result).toBe(false);
  });
});

describe("password", () => {
  test("should return false if the value is not contains A-Z", async () => {
    const invalid = "12345678abc";
    const result = await passwordSchema.isValid(invalid);
    expect(result).toBe(false);
  });

  test("should return false if the value is not contains a-z", async () => {
    const invalid = "12345678ABC";
    const result = await passwordSchema.isValid(invalid);
    expect(result).toBe(false);
  });

  test("should return false if the value is not contains 0-9", async () => {
    const invalid = "Abcdefgh";
    const result = await passwordSchema.isValid(invalid);
    expect(result).toBe(false);
  });

  test("should return false if the value is less than 8 characters", async () => {
    const invalid = "1234";
    const result = await passwordSchema.isValid(invalid);
    expect(result).toBe(false);
  });

  test("should return true if the value is valid password", async () => {
    const valid = "Abcdefgh123";
    const result = await passwordSchema.isValid(valid);
    expect(result).toBe(true);
  });
});
