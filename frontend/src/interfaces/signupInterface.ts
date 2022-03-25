import { setValue } from "../types/formTypes";

export interface loginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends loginUser {
  passwordConfirmation: string;
}

export interface Email {
  email: string;
}

export interface Password {
  password: string;
}
export interface PasswordConfirmation {
  passwordConfirmation: string;
}

export interface UserInputErrors {
  emailInput: string;
  passwordInput: string;
  passwordConfirmationInput: string;
  setEmailError: setValue;
  setPwdError: setValue;
  setPwdConfirmationError: setValue;
}
