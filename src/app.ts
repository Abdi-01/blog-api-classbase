import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response, NextFunction, Application } from "express";

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
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log("API CLASSBASE RUNNING", PORT);
    });
  }
}
