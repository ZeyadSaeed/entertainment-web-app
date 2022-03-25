import { createContext, useState } from "react";

const SigninContext = createContext({
  emailInput: "",
  setEmailInput: (email: string) => {},
  passwordInput: "",
  setPasswordInput: (pwd: string) => {},
  globalError: "",
  setGlobalError: (err: string) => {},
  emailError: "",
  setEmailError: (err: string) => {},
  pwdError: "",
  setPwdError: (err: string) => {},
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

export const SigninProvider = ({ children }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SigninContext.Provider
      value={{
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        globalError,
        setGlobalError,
        emailError,
        setEmailError,
        pwdError,
        setPwdError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SigninContext.Provider>
  );
};

export default SigninContext;
