import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";

class ArticleController {
  async getArticles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      //

      const results = await prisma.post.findMany();

      return res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  }
}

export default ArticleController;
