import { create, getNumericDate } from "djwt/mod.ts";
import { ScanCommand } from "client-dynamodb";
import { compare } from "bcrypt";
import { generateKey } from "../utils/auth.ts";
import DynamodbClient from "../../db/db.ts";
import { unmarshall } from "util-dynamodb";
import { LoginResponse } from "../types.ts";

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
    const command = new ScanCommand({
      TableName: "Mages",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: mageEmail },
      },
    });
    const data = await DynamodbClient.send(command);
    const mage = data.Items?.map((item) => unmarshall(item))[0];
    if (!mage) return { success: false, errorMessage: `Invalid email: ${mageEmail}` };

    const isPasswordCorrect = await compare(magePassword, mage.password);

    if (!isPasswordCorrect) return { success: false, errorMessage: "Invalid password" };

    const token = await authService.generateToken({ email: mage.email, id: mage.id });

    return { success: true, email: mageEmail, token };
  },
};
