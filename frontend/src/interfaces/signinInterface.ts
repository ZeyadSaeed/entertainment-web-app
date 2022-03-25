export interface SigninResetInterface {
  setEmailInput: (email: string) => void;
  setPasswordInput: (pwd: string) => void;
}

export interface UserInputError {
  emailInput: string;
  passwordInput: string;
  setEmailError: (email: string) => void;
  setPwdError: (pwd: string) => void;
}
