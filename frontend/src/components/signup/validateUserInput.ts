import { UserInputErrors } from "../../interfaces/signupInterface";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../../validators/userValidator";

export const userInputErrors = ({
  emailInput,
  passwordInput,
  passwordConfirmationInput,
  setEmailError,
  setPwdError,
  setPwdConfirmationError,
}: UserInputErrors) => {
  const { error: emailErr } = validateEmail({ email: emailInput });
  const { error: pwdErr } = validatePassword({ password: passwordInput });
  const { error: ConfirmationPwdErr } = validatePasswordConfirmation({
    passwordConfirmation: passwordConfirmationInput,
  });

  if (!emailInput) {
    setEmailError("Can't be empty");
    return true;
  } else if (emailErr && emailErr.details) {
    setEmailError("Invalid email");
    return true;
  }

  if (!passwordInput) {
    setPwdError("Can't be empty");
    return true;
  } else if (pwdErr && pwdErr.details) {
    setPwdError("Invalid Password");
    return true;
  }

  if (!passwordConfirmationInput) {
    setPwdConfirmationError("Can't be empty");
    return true;
  } else if (ConfirmationPwdErr && ConfirmationPwdErr.details) {
    setPwdConfirmationError("Invalid Password");
    return true;
  }
};
