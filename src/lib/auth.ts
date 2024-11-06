// src/lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(id: number, rol: string) {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
