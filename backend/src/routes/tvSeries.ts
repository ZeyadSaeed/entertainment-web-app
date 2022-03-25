import { Router, Request, Response } from "express";
import { ShowType } from "../interfaces/showsInterface";
import { Show } from "../model/showModel";
import { auth } from "./../middleware/authMiddleware";
const router = Router();

router.get("/", auth, async (req: Request, res: Response): Promise<void> => {
  // GET TV SERIES MOVIES AND TV SERIES
  const tvSeries: ShowType[] = await Show.find({
    category: "TV Series",
  });
  // SEND TV SERIES ARRAY
  res.status(200).json(tvSeries);
});

export default router;
