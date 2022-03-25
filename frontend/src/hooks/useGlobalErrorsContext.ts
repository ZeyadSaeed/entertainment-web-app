import { useContext } from "react";
import GlobalErrorsContext from "../context/GlobalErrors";

const useGlobalErrorsContext = () => {
  return useContext(GlobalErrorsContext);
};

export default useGlobalErrorsContext;
