import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { CustomResponse } from "../interfaces/resInterface";
import { AuthUser } from "./../interfaces/authInterface";
import { validateAuth as validate } from "../model/authModel";
import { User } from "../model/userModel";
const router = Router();

// AUTHENTICATE USER
router.post(
  "/",
  async (req: Request, res: Response): Promise<Response<CustomResponse>> => {
    // CHECK IF THE USER INPUT WRONG INFO
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // CHECK IF THE USER NOT EXIST
    const user: AuthUser = await User.findOne({ email: req.body.email });
    // IF THERES EMAIL FOUND IN THE DATABASE WITH GIVEN ID SEND ERROR MESSAGE
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // CHECK IF THE USER INPUT CORRECT PASSWORD
    const validPassword: boolean = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // IF THE USER INPUT WRONG PASSWORD SEND ERROR MESSAGE
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    // SEND JWT TOKEN
    const token: string = user.generateAuthToken();
    res.status(200).json({ token });
  }
);

export default router;
