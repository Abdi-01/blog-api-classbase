import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/register", this.authController.register);
    this.route.post("/login", this.authController.login);
    this.route.get("/keep-auth", this.authController.keepLogin);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
