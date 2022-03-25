import { useContext } from "react";
import SignupContext from "../context/SignupContext";

const useSignupContext = () => {
  return useContext(SignupContext);
};

export default useSignupContext;
