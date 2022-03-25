import { createContext, useEffect, useState } from "react";

const GlobalErrorsContext = createContext({
  globalErrors: [],
  setGlobalErrors: (errs: any) => {},
});

export const GlobalErrorsProvider = ({ children }) => {
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const errors = [...globalErrors];
      errors.splice(0, 1);
      setGlobalErrors(errors);
    }, 3000);

    return () => clearTimeout(timer);
  }, [globalErrors]);

  return (
    <GlobalErrorsContext.Provider value={{ globalErrors, setGlobalErrors }}>
      {children}
    </GlobalErrorsContext.Provider>
  );
};
export default GlobalErrorsContext;
