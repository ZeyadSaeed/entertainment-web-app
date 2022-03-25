import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User } from "../model/userModel";
import { UserRequest } from "../interfaces/authInterface";
import { CustomResponse } from "./../interfaces/resInterface";
import { Token } from "./../interfaces/tokenInterface";

export const auth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<Response<CustomResponse>> => {
  const token: string = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded: Token = await jwt.verify(token, process.env.jwtPrivateKey);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
