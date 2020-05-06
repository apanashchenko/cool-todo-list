import "reflect-metadata";
import express from 'express'
import bodyParser from "body-parser";
import project from "./routes/project-routes";
import { createConnection } from "typeorm";

const port = 8090; // default port to listen

const app = express();
app.use(bodyParser.json());
app.use('/projects', project);

export const startServer = async () => {
  await createConnection();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();