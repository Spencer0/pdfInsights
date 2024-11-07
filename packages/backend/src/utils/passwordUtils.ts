// src/utils/passwordUtils.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const passwordUtils = {
  async hashPassword(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
  },

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
};