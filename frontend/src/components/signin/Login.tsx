// LIBRARIES
import useSigninContext from "../../hooks/useSigninContext";
// TYPES
// import { inputChangeEventHandler, submitEvent } from "../../types/formTypes";
import { formInterface } from "../../interfaces/formInterface";
// COMPONENTS
import Button from "../common/Button";
import FormTitle from "../common/FormTitle";
import ChangeForm from "../common/ChangeForm";
// LOGIC
import LoginLogic from "./LoginLogic";

const Form = ({ formName }: formInterface) => {
  const {
    emailInput,
    passwordInput,
    globalError,
    emailError,
    pwdError,
    isLoading,
  } = useSigninContext();

  const { handleUserInput, handleSigninFormSubmit } = LoginLogic();

  return (
    <div className="bg-semiDarkBlue w-full rounded-[10px] p-8 md: text-[15px] max-w-[25rem]">
      <FormTitle title={formName === "login" ? "Login" : "Sign Up"} />

      {globalError && (
        <div className="text-red font-light relative bottom-5 selection:bg-white">
          {globalError}
        </div>
      )}

      <form
        className="flex flex-col mb-[24px]"
        onSubmit={(e) => handleSigninFormSubmit(e)}
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

        <Button
          isLoading={isLoading}
          text="Login to your account"
          formName={formName}
        />
      </form>

      <ChangeForm title="Don't" formName="Sign Up" />
    </div>
  );
};
export default Form;
