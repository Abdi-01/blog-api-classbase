import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { compare, genSalt, hash } from "bcrypt";
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

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw "Account is not exist";
      }

      // Check password
      const comparePass = await compare(req.body.password, user.password);

      if (!comparePass) {
        throw "Password is wrong";
      }

      const token = createToken(
        { id: user.id, isVerified: user.isVerified },
        "24h"
      );

      return res.status(200).send({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: res.locals.data.id },
      });

      if (!user) {
        throw "Account is not exist";
      }

      const token = createToken(
        { id: user.id, isVerified: user.isVerified },
        "24h"
      );

      return res.status(200).send({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
