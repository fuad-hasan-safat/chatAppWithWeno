import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
/**
 * Hashes a plain text password.
 * @param password The plain text password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
//   const saltRounds = bcrypt.genSaltSync(10); // You can adjust this for more security (higher = slower)
  return await bcrypt.hash(password);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password to check.
 * @param hash The hash to compare with.
 * @returns True if the password matches the hash, false otherwise.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
