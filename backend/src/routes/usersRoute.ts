// LIBRARIES
import bcrypt from "bcrypt";
import passwordComplexity from "joi-password-complexity";
import { Router, Request, Response } from "express";
// MODELS
import { User, validateUser as validate } from "../model/userModel";
// MIDDLEWARE
import { auth } from "../middleware/authMiddleware";
// INTERFACES
import { CustomResponse } from "../interfaces/resInterface";
import { FullInfoUser } from "../interfaces/userInterface";
import { UserRequest } from "../interfaces/authInterface";
const router = Router();

const complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
};

router.get(
  "/me",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    // SEND USER OBJECT
    res.status(200).send(req.user);
  }
);

router.post(
  "/",
  async (req: Request, res: Response): Promise<Response<CustomResponse>> => {
    // CHECK IF THE USER INPUT WRONG INFO
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // CHECK IF THE USER INPUT TWO PASSWORDS DON'T MATCH
    if (req.body.password !== req.body.repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // CHECK IF THE USER INPUT WEAK PASSWORD
    const password = passwordComplexity(complexityOptions).validate(
      req.body.password
    );
    if (password.error)
      return res
        .status(400)
        .json({ message: password.error.details[0].message });

    // CHECK IF THE USER IS ALREADY EXIST
    let user: FullInfoUser = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered." });

    // CREATE A NEW USER
    user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // GENERATE TOKEN
    const token = user.generateAuthToken();
    res.json({ token });
  }
);

export default router;
