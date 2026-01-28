import bcrypt from "bcrypt";
import crypto from "crypto";

function md5(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

/**
 * Supports:
 * - plain text (stored == input)
 * - md5 hex
 * - sha1 hex
 * - bcrypt
 *
 * If you're unsure which one your CI used, this function tries all safely.
 */
export async function verifyLegacyPassword(inputPassword: string, storedPassword: string) {
  if (!storedPassword) return false;

  // 1) Plain text match
  if (storedPassword === inputPassword) return true;

  // 2) MD5 match (hex)
  if (storedPassword.length === 32 && /^[a-f0-9]+$/i.test(storedPassword)) {
    if (md5(inputPassword) === storedPassword.toLowerCase()) return true;
  }

  // 3) SHA1 match (hex)
  if (storedPassword.length === 40 && /^[a-f0-9]+$/i.test(storedPassword)) {
    if (sha1(inputPassword) === storedPassword.toLowerCase()) return true;
  }

  // 4) bcrypt match (common prefixes)
  if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2y$")) {
    try {
      return await bcrypt.compare(inputPassword, storedPassword);
    } catch {
      return false;
    }
  }

  return false;
}
