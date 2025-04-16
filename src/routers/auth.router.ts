import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { regisValidation } from "../middleware/validation/auth";
import TokenVerifier from "../middleware/verifyToken";

class AuthRouter {
  private route: Router;
  private authController: AuthController;
  private tokenVerifier: TokenVerifier;

  constructor() {
    this.authController = new AuthController();
    this.tokenVerifier = new TokenVerifier();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/register", regisValidation, this.authController.register);
    this.route.post("/login", this.authController.login);

    // this.route.use(this.tokenVerifier.verifyToken);
    this.route.get(
      "/keep-auth",
      this.tokenVerifier.verifyToken,
      this.authController.keepLogin
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
