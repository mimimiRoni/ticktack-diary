import { emailScheme } from "../../src/lib/validation";

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
