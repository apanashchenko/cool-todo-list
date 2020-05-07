import "reflect-metadata";
import { createConnection } from "typeorm";
import {app} from "./app";
import {port} from "./config/config";

export const startServer = async () => {
  await createConnection();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();