import express, { Application, Request, Response } from "express";
import process from "process";

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
