import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response, NextFunction, Application } from "express";
import AuthRouter from "./routers/auth.router";

const PORT = process.env.PORT || 8083;
class App {
  app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.route();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private route(): void {
    // Config route type here
    const authRouter = new AuthRouter();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h1>CLASSBASE API</h1>");
    });

    this.app.use("/auth", authRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log("API CLASSBASE RUNNING", PORT);
    });
  }
}

export default App;
