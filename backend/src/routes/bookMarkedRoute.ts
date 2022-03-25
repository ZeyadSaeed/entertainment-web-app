import { Router, Response } from "express";
import { User } from "../model/userModel";
import { UserRequest } from "../interfaces/authInterface";
import { auth } from "../middleware/authMiddleware";
import { FullInfoUser } from "../interfaces/userInterface";
import { Show } from "../model/showModel";

const router = Router();

// ADD MOVIE OR TV SERIES TO THE USER BOOKMARKED
router.post(
  "/:id",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    const show = await Show.findById(req.params.id);
    const user = req.user;
    if (show.category === "Movie") {
      // ADD MOVIE TO THE USER BOOKMARKED
      user.bookMarkedMovies.push({
        show: req.params.id,
      });
    } else {
      //ADD TV SERIES TO THE USER BOOKMARKED
      user.bookMarkedTvSeries.push({
        show: req.params.id,
      });
    }
    // SAVE IT IN THE DATABASE
    user.save();
    // SEND USER OBJECT
    res.status(201).json(req.user);
  }
);

// GET ALL BOOKMARKED USER MOVIES AND TV SERIES
router.get(
  "/all",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    const user: FullInfoUser = await User.findById(req.user._id)
      .populate("bookMarkedMovies.show bookMarkedTvSeries.show")
      .select("bookMarkedMovies bookMarkedTvSeries");

    res.status(200).json(user);
  }
);

// GET BOOKMARKED USER MOVIES
router.get(
  "/movies",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    // GET AUTHENTICATED USER
    const user: FullInfoUser = await User.findById(req.user._id)
      // GET ALL BOOKMARKED MOVIES OBJECTS
      .populate("bookMarkedMovies.show")
      // SELECT BOOKMARKED MOVIES ARRAY FROM USER OBJECT
      .select("bookMarkedMovies");
    // SEND USER BOOKMARKED MOVIES ARRAY
    res.status(200).json(user);
  }
);
// GET BOOKMARKED USER TV SERIES
router.get(
  "/tvseries",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    // GET AUTHENTICATED USER
    const user: FullInfoUser = await User.findById(req.user._id)
      // GET ALL BOOKMARKED TV SERIES OBJECTS
      .populate("bookMarkedTvSeries.show")
      // SELECT BOOKMARKED TV SERIES ARRAY FROM USER OBJECT
      .select("bookMarkedTvSeries");
    // SEND USER BOOKMARKED TV SERIES ARRAY
    res.status(200).json(user);
  }
);

// REMOVE BOOKMARKED MOVIE OR TV SERIES FROM USER BOOKMARKED
router.delete(
  "/:id",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    // UPDATE USER OBJECT BY PULLING THE THE MOVIE WITH GIVEN ID FROM USER BOOKMARKED ARRAY
    const show = await Show.findById(req.params.id);

    if (show.category === "Movie") {
      // DELETE BOOKMARKED MOVIE FROM USER
      const user: FullInfoUser = await User.findByIdAndUpdate(req.user._id, {
        $pull: { bookMarkedMovies: { show: req.params.id } },
      }).select("-password");
      // SEND THE RESULT
      res.status(200).json(user);
    } else {
      const user: FullInfoUser = await User.findByIdAndUpdate(req.user._id, {
        $pull: { bookMarkedTvSeries: { show: req.params.id } },
      }).select("-password");
      // SEND THE RESULT
      res.status(200).json(user);
    }
  }
);

export default router;
