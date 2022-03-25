import express, { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import path from "path";

export default (app: Application) => {
  app.use(helmet());
  app.use(compression());
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../../frontend/build")));

    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(
          __dirname,
          "../",
          "../",
          "../",
          "frontend",
          "build",
          "index.html"
        )
      );
    });
  } else {
    app.get("/", (req, res) => res.send("App is not in production."));
  }
};
