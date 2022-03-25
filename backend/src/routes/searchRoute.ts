import { Request, Response, Router } from "express";
import { ShowType } from "../interfaces/showsInterface";
import { Show } from "../model/showModel";
import { auth } from "../middleware/authMiddleware";
import { User } from "../model/userModel";
import { UserRequest } from "./../interfaces/authInterface";
const router = Router();

router.post("/", auth, async (req: Request, res: Response): Promise<void> => {
  // SEARCH FOR ALL MOVIES AND TV SERIES
  const searchResult: ShowType[] = await Show.find({
    title: { $regex: req.body.search, $options: "i" },
  });
  // SEND SEARCH RESULT
  res.status(200).json(searchResult);
});

router.post(
  "/movies",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // SEARCH FOR ALL MOVIES
    const searchResult: ShowType[] = await Show.find({
      title: { $regex: req.body.search, $options: "i" },
      category: "Movie",
    });
    // SEND SEARCH RESULT
    res.status(200).json(searchResult);
  }
);

router.post(
  "/tvseries",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // SEARCH FOR ALL TV SERIES
    const searchResult: ShowType[] = await Show.find({
      title: { $regex: req.body.search, $options: "i" },
      category: "TV Series",
    });
    // SEND SEARCH RESULT
    res.status(200).json(searchResult);
  }
);

router.post(
  "/bookmark",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    // SEARCH FOR ALL TV SERIES
    const searchResults = await User.findById(req.user._id)
      // GET THE BOOKMARKED OBJECTS THE EQUAL TO SEARCH RESULT
      .populate({
        path: "bookMarkedMovies.show bookMarkedTvSeries.show",
        match: {
          title: { $regex: req.body.search, $options: "i" },
        },
      })
      // SELECT ONLY BOOKMARKED MOVIES AND TV SERIES
      .select("bookMarkedMovies bookMarkedTvSeries -_id");
    // ADD ALL TO BOOKMARKED MOVIES AND TV SERIES TO ONE ARRAY
    const results = [
      ...searchResults.bookMarkedMovies,
      ...searchResults.bookMarkedTvSeries,

      // SHOW ONLY SHOW OBJECT FOR EACH BOOKMARKED SHOW
    ].map((result) => result.show);

    // SEND SEARCH RESULT
    res.status(200).json(results);
  }
);

export default router;
