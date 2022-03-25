/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ChangeEvent, SubmitEvent } from "../../types/formTypes";
import useSigninContext from "../../hooks/useSigninContext";
import { userInputErrors } from "./validateUserInput";
import { validateEmail } from "../../validators/userValidator";
import axios from "../../api/axios";
import reset from "./resetUserInput";
import { useNavigate } from "react-router";

const LoginLogic = () => {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    setGlobalError,
    emailError,
    setEmailError,
    pwdError,
    setPwdError,
    setIsLoading,
  } = useSigninContext();

  const navigate = useNavigate();

  useEffect(() => {
    const { error } = validateEmail({ email: emailInput });

    if (emailInput.length > 0 && error) {
      return setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  }, [emailInput]);

  const handleUserInput = (e: ChangeEvent): void => {
    const value: string = e.target.value;
    const targetName: string = e.target.name;

    if (targetName === "email") {
      return setEmailInput(value);
    } else if (targetName === "password") {
      return setPasswordInput(value);
    }
  };

  const handleSigninFormSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    const isError = userInputErrors({
      emailInput,
      passwordInput,
      setEmailError,
      setPwdError,
    });

    if (isError || pwdError || emailError) return;

    try {
      // SET LOADING TO TRUE
      setIsLoading(true);
      const res = await axios.post(
        "/auth",
        {
          email: emailInput,
          password: passwordInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Credential: true,
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      // RESET INPUTS FIELDS
      reset({ setEmailInput, setPasswordInput });
      // REMOVE GLOBAL ERROR MESSAGES
      setGlobalError("");
      // SET LOADING TO FALSE
      setIsLoading(false);
      // NAVIGATE TO THE HOME PAGE
      navigate("/");
    } catch (err) {
      if (!err.response) {
        return setGlobalError("No server response");
      }
      setGlobalError(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return { handleUserInput, handleSigninFormSubmit };
};
export default LoginLogic;
