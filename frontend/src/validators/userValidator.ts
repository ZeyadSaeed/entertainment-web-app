import {
  Email,
  Password,
  PasswordConfirmation,
} from "../interfaces/signupInterface";
import Joi from "joi-oid";

// CHECK IF THE USER INPUT CORRECT INFO TO CREATE AN ACCOUNT
export const validateEmail = (email: Email) => {
  const schema = Joi.object<Email>({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({ tlds: { allow: false } }),
  });

  return schema.validate(email);
};

export const validatePassword = (password: Password) => {
  const schema = Joi.object<Password>({
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(password);
};

export const validatePasswordConfirmation = (
  passwordConfirmation: PasswordConfirmation
) => {
  const schema = Joi.object<PasswordConfirmation>({
    passwordConfirmation: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(passwordConfirmation);
};
