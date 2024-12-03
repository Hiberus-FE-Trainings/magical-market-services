import { create, getNumericDate } from "djwt/mod.ts";
import { generateKey } from "../utils/auth.ts";

export const authService = {
  generateToken: async (payload: Record<string, unknown>) => {
    try {
      const key = await generateKey();
      const jwt = await create(
        { alg: "HS512", typ: "JWT" },
        { ...payload, exp: getNumericDate(60 * 60) },
        key
      );
      return jwt;
    } catch (_error) {
      throw new Error("Failed to generate JWT token");
    }
  },
};
