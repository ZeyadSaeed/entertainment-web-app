import express, { Application } from "express";
import cors from "cors";
import users from "../routes/usersRoute";
import auth from "../routes/authRoute";
import recommended from "../routes/recommendedRoute";
import movies from "../routes/moviesRoute";
import tvSeries from "../routes/tvSeries";
import trending from "../routes/trendingRoute";
import bookmarked from "../routes/bookMarkedRoute";
import search from "../routes/searchRoute";
import { errorHandler } from "../middleware/errorMiddleware";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/recommended", recommended);
  app.use("/api/movies", movies);
  app.use("/api/tvSeries", tvSeries);
  app.use("/api/trending", trending);
  app.use("/api/bookmarked", bookmarked);
  app.use("/api/search", search);
  app.use(errorHandler);
};
