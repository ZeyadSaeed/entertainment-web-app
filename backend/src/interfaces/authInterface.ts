import { Request } from "express";
import { UserType } from "./userInterface";

export interface UserRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export interface UserInterface {
  email: string;
  password: string;
}

export interface AuthUser extends UserType {
  password: string;
  generateAuthToken: () => string;
}
