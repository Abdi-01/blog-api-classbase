import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { genSalt, hash } from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import { sign } from "jsonwebtoken";
import { createToken } from "../utils/createToken";
import { transporter } from "../config/nodemailer";

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

      const newPasword = await hashPassword(req.body.password);

      const regis = await prisma.user.create({
        data: { ...req.body, password: newPasword },
      });

      const token = createToken({ id: regis.id, email: regis.email });

      await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: req.body.email,
        subject: "Verify Registration Account",
        html: `
        <h1>Thank you for register account ${req.body.email}</h1>
        <a href="${process.env.FE_URL}/verify?t=${token}">Verify Now</a>
        `,
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
