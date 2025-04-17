import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import redisClient from "../config/redis";

class ArticleController {
  async getArticles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // 1. Check data in redis
      const articleRedis = await redisClient.get("articles");

      // 2. If exist, use data from redis as a response
      if (articleRedis) {
        console.log("Data from redis");

        return res.status(200).send(JSON.parse(articleRedis));
      }

      // 3. If not exist data in redis
      const results = await prisma.post.findMany();

      // 4. Store data from prisma to redis
      await redisClient.setEx("articles", 10, JSON.stringify(results));

      return res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  }
}

export default ArticleController;
