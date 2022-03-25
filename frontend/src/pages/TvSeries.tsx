import { useEffect } from "react";
import axios from "./../api/axios";
import useSearchContext from "../hooks/useSearchContext";
import GlobalErrors from "../components/globalErrors/GlobalErrors";
import SearchBar from "../components/common/SearchBar";
import TVseries from "../components/tvseries/TVseries";
import SearchedResult from "../components/common/SearchedResult";
import useGlobalErrorsContext from "./../hooks/useGlobalErrorsContext";

const TvSeries = () => {
  const { searchInput, setSearchedResults, setIsLoading } = useSearchContext();
  const { setGlobalErrors } = useGlobalErrorsContext();

  useEffect(() => {
    let abortController = new AbortController();
    setIsLoading(true);

    if (searchInput.length > 0) {
      const fetch = async (): Promise<void> => {
        try {
          const { data } = await axios.post("/search/tvseries", {
            search: searchInput,
          });
          setSearchedResults(data);
          // SET LOADING TO FALSE
          setIsLoading(false);
        } catch (err) {
          // IF THERE'S ANY ERRORS SET IT TO GLOBAL ERRORS
          const message = err?.response?.data;
          setGlobalErrors([message]);
          // SET LOADING TO FALSE
          setIsLoading(false);
        }
      };
      fetch();
    } else {
      setSearchedResults([]);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, setSearchedResults]);

  return (
    <main className="py-4 pl-4 md:pl-[25px] lg:pl-[36px] w-full">
      <GlobalErrors />
      <SearchBar placeholder="Search for TV series" route="/" />
      {searchInput.length > 0 ? <SearchedResult /> : <TVseries />}
    </main>
  );
};
export default TvSeries;
