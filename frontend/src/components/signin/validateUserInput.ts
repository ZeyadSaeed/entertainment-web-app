import { UserInputError } from "../../interfaces/signinInterface";
import { validatePassword } from "../../validators/userValidator";

export const userInputErrors = ({
  emailInput,
  passwordInput,
  setEmailError,
  setPwdError,
}: UserInputError): boolean => {
  const { error: pwdErr } = validatePassword({ password: passwordInput });

  if (!emailInput) {
    setEmailError("Can't be empty");
    return true;
  }

  if (!passwordInput) {
    setPwdError("Can't be empty");
    return true;
  } else if (pwdErr && pwdErr.details) {
    setPwdError("Invalid Password");
    return true;
  } else {
    setPwdError("");
  }
};
