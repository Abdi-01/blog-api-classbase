import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "../../prisma/generated/client";

class TokenVerifier {
  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Read token
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) {
        throw "Token is not exist";
      }

      // Verify token data
      const checkToken: string | JwtPayload = verify(
        token,
        process.env.TOKEN_KEY || "test"
      );

      console.log(checkToken);

      res.locals.data = checkToken;
      next();
    } catch (error) {
      next(error);
    }
  }

  async verifyAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!res.locals.data.isVerified) {
        throw "Your account is not verified";
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default TokenVerifier;
