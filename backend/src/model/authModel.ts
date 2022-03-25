import Joi from "joi-oid";
import { AuthUser } from "../interfaces/authInterface";

// CHECK IF THE USER INPUT CORRECT INFO TO AUTHENTICATE
export const validateAuth = (req: AuthUser) => {
  const schema = Joi.object<AuthUser>({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
};
