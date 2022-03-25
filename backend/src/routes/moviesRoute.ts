import { Router, Request, Response } from "express";
import { ShowType } from "../interfaces/showsInterface";
import { Show } from "../model/showModel";
import { auth } from "./../middleware/authMiddleware";
const router = Router();

router.get("/", auth, async (req: Request, res: Response): Promise<void> => {
  // GET ALL MOVIES
  const movies: ShowType[] = await Show.find({
    category: "Movie",
  });
  // SEND MOVIES ARRAY
  res.status(200).json(movies);
});

export default router;
