import { Router } from "express";
import ArticleController from "../controllers/article.controller";

class ArticleRouter {
  private route: Router;
  private articleController: ArticleController;

  constructor() {
    this.articleController = new ArticleController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get("/", this.articleController.getArticles);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default ArticleRouter;
