import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "CHANGE_ME_IN_.env.local";

export type JwtUser = {
  user_id: number;
  username: string;
  user_level?: number;
};

export function signToken(user: JwtUser) {
  return jwt.sign(user, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): JwtUser {
  return jwt.verify(token, SECRET) as JwtUser;
}

export function getBearerToken(authorization: string | null) {
  if (!authorization) return null;
  const m = authorization.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}
