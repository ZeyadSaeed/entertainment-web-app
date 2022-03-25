import { SigninResetInterface } from "../../interfaces/signinInterface";

const reset = ({ setEmailInput, setPasswordInput }: SigninResetInterface) => {
  setEmailInput("");
  setPasswordInput("");
};

export default reset;
