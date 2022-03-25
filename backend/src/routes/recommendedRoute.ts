import { Router, Request, Response } from "express";
import { Show } from "../model/showModel";
import { auth } from "../middleware/authMiddleware";
import { ShowType } from "../interfaces/showsInterface";
const router = Router();

router.get("/", auth, async (req: Request, res: Response): Promise<void> => {
  // GET ALL MOVIES AND TV SERIES
  const shows: ShowType[] = await Show.find({
    isTrending: false,
  });
  // SEND MOVIES AND TV SERIES ARRAY
  res.status(200).json(shows);
});

export default router;
