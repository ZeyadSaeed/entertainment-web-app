/* eslint-disable react-hooks/exhaustive-deps */
// LIBRARIES
import axios from "../../api/axios";
import useSignupContext from "../../hooks/useSignupContext";
import passwordComplexity from "joi-password-complexity";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// HELPER FUNCTIONS
import { userInputErrors } from "./validateUserInput";
import reset from "./resetUserInputs";
// TYPES
import { ChangeEvent, SubmitEvent } from "../../types/formTypes";

const SignupLogic = () => {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    passwordConfirmationInput,
    setPasswordConfirmationInput,
    setGlobalError,
    emailError,
    setEmailError,
    pwdError,
    setPwdError,
    pwdConfirmationError,
    setPwdConfirmationError,
    setIsLoading,
  } = useSignupContext();

  const navigate = useNavigate();

  // HANDLE ERROR MESSAGES
  useEffect(() => {
    // REMOVE ERROR
    if (emailInput.length > 0) setEmailError("");
  }, [emailInput]);

  useEffect(() => {
    // CHECK FOR PASSWORD COMPLEXITY
    const pwdComplexity = passwordComplexity().validate(passwordInput);
    if (pwdComplexity.error && passwordInput.length > 0) {
      setPwdError("Weak password");
    } else {
      setPwdError("");
    }
  }, [passwordInput]);

  useEffect(() => {
    // IF PASSWORD NOT MATCH PASSWORD CONFIRMATION
    if (
      passwordConfirmationInput !== passwordInput &&
      passwordConfirmationInput.length > 0 &&
      passwordInput.length > 0
    ) {
      setPwdConfirmationError("Passwords do not match");
    } else {
      setPwdConfirmationError("");
    }
  }, [passwordConfirmationInput, passwordInput]);

  // STORAGE USER INPUT IN USE STATE HOOK
  const handleUserInput = (e: ChangeEvent): void => {
    const value: string = e.target.value;
    const targetName: string = e.target.name;

    if (targetName === "email") {
      return setEmailInput(value);
    } else if (targetName === "password") {
      return setPasswordInput(value);
    } else {
      return setPasswordConfirmationInput(value);
    }
  };

  const handleSignupFormSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    // HANDLE INPUT MESSAGES
    const isError = userInputErrors({
      emailInput,
      passwordInput,
      passwordConfirmationInput,
      setEmailError,
      setPwdError,
      setPwdConfirmationError,
    });
    // RETURN IF THERE'S ANY ERRORS
    if (isError || pwdConfirmationError || pwdError || emailError) return;

    try {
      // SET LOADING TO TRUE
      setIsLoading(true);
      // SEND REQ TO THE SERVER TO CREATE AN ACCOUNT
      const res = await axios.post(
        "/users",
        {
          email: emailInput,
          password: passwordInput,
          repeatPassword: passwordConfirmationInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Credential: true,
          },
        }
      );
      // PUT TOKEN TO THE LOCAL STORAGE
      localStorage.setItem("token", res.data.token);
      // RESET INPUT FIELDS
      reset({ setEmailInput, setPasswordInput, setPasswordConfirmationInput });
      // REMOVE GLOBAL ERROR MESSAGES
      setGlobalError("");
      // SET LOADING TO FALSE
      setIsLoading(false);
      // NAVIGATE TO THE HOME PAGE
      navigate("/");
      // RELOAD THE PAGE
      window.location.reload();
    } catch (err) {
      if (!err.response) {
        return setGlobalError("No server response");
      }
      setGlobalError(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return { handleSignupFormSubmit, handleUserInput };
};

export default SignupLogic;
