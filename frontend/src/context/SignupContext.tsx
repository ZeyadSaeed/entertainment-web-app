import { createContext, useState } from "react";

const SignupContext = createContext({
  emailInput: "",
  setEmailInput: (email: string) => {},
  passwordInput: "",
  setPasswordInput: (pwd: string) => {},
  passwordConfirmationInput: "",
  setPasswordConfirmationInput: (pwd: string) => {},
  globalError: "",
  setGlobalError: (err: string) => {},
  emailError: "",
  setEmailError: (err: string) => {},
  pwdError: "",
  setPwdError: (err: string) => {},
  pwdConfirmationError: "",
  setPwdConfirmationError: (err: string) => {},
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

export const SignupProvider = ({ children }) => {
  // USER INPUT
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] =
    useState<string>("");
  // FORM ERRORS
  const [globalError, setGlobalError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [pwdError, setPwdError] = useState<string>("");
  const [pwdConfirmationError, setPwdConfirmationError] = useState<string>("");
  // IS LOADING
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SignupContext.Provider
      value={{
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        passwordConfirmationInput,
        setPasswordConfirmationInput,
        globalError,
        setGlobalError,
        emailError,
        setEmailError,
        pwdError,
        setPwdError,
        pwdConfirmationError,
        setPwdConfirmationError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};
export default SignupContext;
