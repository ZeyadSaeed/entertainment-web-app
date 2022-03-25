import { useContext } from "react";
import SigninContext from "../context/SigninContext";

const useSigninContext = () => {
  return useContext(SigninContext);
};

export default useSigninContext;
