import { Router, Request, Response } from "express";
import { ShowType } from "../interfaces/showsInterface";
import { Show } from "../model/showModel";
import { auth } from "../middleware/authMiddleware";
const router = Router();

router.get("/", auth, async (req: Request, res: Response): Promise<void> => {
  // GET TRENDING MOVIES AND TV SERIES
  const tending: ShowType[] = await Show.find({
    isTrending: true,
  });
  // SEND TRENDING ARRAY
  res.status(200).json(tending);
});

export default router;
