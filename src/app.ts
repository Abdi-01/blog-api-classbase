import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response, NextFunction, Application } from "express";
import AuthRouter from "./routers/auth.router";
import redisClient from "./config/redis";
import ArticleRouter from "./routers/article.router";

const PORT = process.env.PORT || 8083;
class App {
  app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.route();
    this.errorHandler();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private route(): void {
    // Config route type here
    const authRouter = new AuthRouter();
    const articleRouter = new ArticleRouter();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h1>CLASSBASE API</h1>");
    });

    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/article", articleRouter.getRouter());
  }

  private errorHandler(): void {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Server Error",
          error,
        });
      }
    );
  }

  public async start(): Promise<void> {
    await redisClient.connect();
    this.app.listen(PORT, () => {
      console.log("API CLASSBASE RUNNING", PORT);
    });
  }
}

export default App;
