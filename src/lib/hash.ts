import bcrypt from "bcrypt";

// 加密密码
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // 盐的轮数
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// 验证密码
async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, hash);
  return match;
}

export { hashPassword, verifyPassword };
