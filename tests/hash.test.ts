import { hashPassword, verifyPassword } from "../src/lib/hash";
import { expect, test } from "vitest";

test("hash", async () => {
  const password = "yourPassword123";
  const hashedPassword = await hashPassword(password);
  console.log("Hashed Password:", hashedPassword);

  const isMatch = await verifyPassword(password, hashedPassword);

  expect(isMatch).toBe(true);
});
