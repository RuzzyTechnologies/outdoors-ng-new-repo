import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
if (!SECRET) throw new Error("JWT_SECRET is missing in .env.local");

export type JwtPayload = {
  sub: string;
  role: "admin";
  iat?: number;
  exp?: number;
};

export function signAdminToken(sub: string) {
  return jwt.sign({ sub, role: "admin" }, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as JwtPayload;
}
