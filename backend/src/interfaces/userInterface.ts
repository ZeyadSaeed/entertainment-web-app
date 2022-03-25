import { UserBookMarked } from "./bookmarkedInterface";
import { UserInterface } from "./authInterface";
import { Document } from "mongoose";

export interface RegisterUser extends UserInterface {
  repeatPassword: string;
}
export interface UserSchema extends UserInterface {
  bookMarkedMovies: UserBookMarked[];
  bookMarkedTvSeries: UserBookMarked[];
}

export interface UserModule extends UserSchema {
  generateAuthToken: () => string;
}

export interface UserType extends Document {
  _id: string;
  email: string;
  bookMarked: UserBookMarked[];
  createdAt: Date;
  updateAt: Date;
  __v: number;
}

export interface FullInfoUser extends Document {
  password: string;
  generateAuthToken: () => string;
  email: string;
}
