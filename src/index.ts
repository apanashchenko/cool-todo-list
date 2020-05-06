import "reflect-metadata";
import { createConnection } from "typeorm";
import {app} from "./app";

const port = 8090; // default port to listen

export const startServer = async () => {
  await createConnection();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();