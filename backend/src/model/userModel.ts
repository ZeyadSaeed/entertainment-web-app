import Joi from "joi-oid";
import { Schema, model, Model } from "mongoose";
import jwt from "jsonwebtoken";
import {
  RegisterUser,
  UserSchema,
  UserModule,
} from "../interfaces/userInterface";

// CREATE USER SCHEMA
export const userSchema: Schema = new Schema<UserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    bookMarkedMovies: [
      {
        show: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Show",
        },
      },
    ],
    bookMarkedTvSeries: [
      {
        show: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Show",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ADD METHOD TO USER SCHEMA TO GENERATE NEW AUTH TOKEN
userSchema.methods.generateAuthToken = function (): string {
  const token: string = jwt.sign({ id: this._id }, process.env.jwtPrivateKey);

  return token;
};

// USER MODEL
export const User: Model<UserModule> = model<UserModule>("User", userSchema);

// CHECK IF THE USER INPUT CORRECT INFO TO CREATE AN ACCOUNT
export const validateUser = (user: RegisterUser) => {
  const schema = Joi.object<RegisterUser>({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    repeatPassword: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
};
