import express, { Application, Request, Response } from "express";
import process from "process";
import { buildSchema } from "graphql";
import graphqlHTTP from "express-graphql";

const schema = buildSchema(`
type Query {
  hello: String
}`);

const root = {
  hello: () => "Hello, World!",
};

const app: Application = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
