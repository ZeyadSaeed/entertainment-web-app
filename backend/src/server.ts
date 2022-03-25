import "express-async-errors";
import express, { Application } from "express";
import { port } from "./types/port";
import dotenv from "dotenv";
import mongoConnection from "./config/db";
import routes from "./startup/routes";
import logging from "./startup/logging";
import config from "./startup/config";
import prod from "./startup/prod";
const app: Application = express();

dotenv.config();
logging();
routes(app);
mongoConnection();
config();
prod(app);

const port: port = process.env.PORT || 3000;
app.listen(port, (): void => {
  console.log(`App is running in port ${port}`);
});
