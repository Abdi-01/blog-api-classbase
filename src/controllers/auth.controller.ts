import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { genSalt, hash } from "bcrypt";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Check user account
      const isExist = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (isExist) {
        return res.status(400).send({
          success: false,
          message: `${req.body.email} is exist. Use other email`,
        });
      }

      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);

      const regis = await prisma.user.create({
        data: { ...req.body, password: hashPassword },
      });

      return res.status(200).send({
        success: true,
        message: "Register success",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      //
    } catch (error) {
      console.log(error);
    }
  }

  async keepLogin(req: Request, res: Response): Promise<any> {
    try {
      //
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
