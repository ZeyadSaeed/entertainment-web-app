import { createContext, useState } from "react";
import { ShowType } from "../interfaces/showInterface";

const SearchContext = createContext({
  searchInput: "",
  setSearchInput: (text: string) => {},
  searchedResults: [],
  setSearchedResults: (s: ShowType[]) => {},
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<ShowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchedResults,
        setSearchedResults,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
