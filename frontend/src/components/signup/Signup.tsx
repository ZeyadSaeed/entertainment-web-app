// TYPES
import { formInterface } from "../../interfaces/formInterface";
// COMPONENTS
import FormTitle from "../common/FormTitle";
import Button from "../common/Button";
import ChangeForm from "../common/ChangeForm";
import SignupLogic from "./SignupLogic";
// CONTEXT
import useSignupContext from "../../hooks/useSignupContext";

const SignupForm = ({ formName }: formInterface) => {
  const {
    emailInput,
    passwordInput,
    passwordConfirmationInput,
    globalError,
    emailError,
    pwdError,
    pwdConfirmationError,
    isLoading,
  } = useSignupContext();

  const { handleSignupFormSubmit, handleUserInput } = SignupLogic();

  return (
    <div className="bg-semiDarkBlue w-full rounded-[10px] p-8 md: text-[15px] max-w-[25rem] relative">
      <FormTitle title="Sign Up" />

      {globalError && (
        <div className="text-red font-light relative bottom-5 selection:bg-white">
          {globalError}
        </div>
      )}

      <form
        className="flex flex-col mb-[24px]"
        onSubmit={(e) => handleSignupFormSubmit(e)}
      >
        <div className="relative font-light mr-[16px]">
          <input
            className={`${
              emailError
                ? "border-red hover:border-red focus:border-red"
                : "border-greyishBlue"
            }`}
            value={emailInput}
            onChange={(e) => handleUserInput(e)}
            type="text"
            autoComplete="off"
            name="email"
            placeholder="Email address"
          />
          <div
            className="text-red text-[13px] absolute right-0 top-0 selection:bg-white"
            style={{ display: emailError ? "block" : "none" }}
          >
            {emailError}
          </div>
        </div>

        <div className="relative font-light mr-[16px]">
          <input
            className={`${
              pwdError
                ? "border-red hover:border-red focus:border-red"
                : "border-greyishBlue"
            }`}
            value={passwordInput}
            onChange={(e) => handleUserInput(e)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <div
            className="text-red text-[13px] absolute right-0 top-0 selection:bg-white"
            style={{ display: pwdError ? "block" : "none" }}
          >
            {pwdError}
          </div>
        </div>
        <div className="relative font-light mr-[16px]">
          <input
            className={`${
              pwdConfirmationError
                ? "border-red hover:border-red focus:border-red"
                : "border-greyishBlue"
            }`}
            value={passwordConfirmationInput}
            onChange={(e) => handleUserInput(e)}
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
          />
          <div
            className="text-red text-[13px] absolute right-0 top-0 selection:bg-white"
            style={{ display: pwdConfirmationError ? "block" : "none" }}
          >
            {pwdConfirmationError}
          </div>
        </div>

        <Button
          text="Create an account"
          formName={formName}
          isLoading={isLoading}
        />
      </form>
      <ChangeForm title="Already" formName="Login" />
    </div>
  );
};
export default SignupForm;
