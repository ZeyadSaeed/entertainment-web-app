import winston from "winston";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Something Failed.");

  next(err);
};
