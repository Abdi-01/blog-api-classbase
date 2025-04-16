import { sign } from "jsonwebtoken";

export const createToken = (data: any, expiresIn?: any) => {
  return sign(data, process.env.TOKEN_KEY || "test", {
    expiresIn: expiresIn || "1h",
  });
};
