import { create, getNumericDate } from "djwt/mod.ts";
import { compare } from "bcrypt";
import { generateKey } from "../utils/auth.ts";
import { LoginResponse } from "../types.ts";
import { ENV } from "../../config/env.ts";

export const authService = {
  generateToken: async (payload: Record<string, unknown>) => {
    try {
      const key = await generateKey();
      const jwt = await create({ alg: "HS512", typ: "JWT" }, { ...payload, exp: getNumericDate(60 * 60) }, key);
      return jwt;
    } catch (_error) {
      throw new Error("Failed to generate JWT token");
    }
  },
  login: async (mageEmail: string, magePassword: string): Promise<LoginResponse> => {
    try {
      const mage = await fetch(`${ENV.MAGES_URL}/email/${mageEmail}`).then((res) => res.json());
      const isPasswordCorrect = await compare(magePassword, mage.password);

      if (!isPasswordCorrect) return { success: false, errorMessage: "Invalid password" };

      const token = await authService.generateToken({ email: mage.email, id: mage.id });

      return { success: true, email: mage.email, token };
    } catch {
      return { success: false, errorMessage: `Invalid email: ${mageEmail}` };
    }
  },
};
