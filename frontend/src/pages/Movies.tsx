import axios from "../api/axios";
import { useEffect } from "react";
import useSearchContext from "../hooks/useSearchContext";
import GlobalErrors from "../components/globalErrors/GlobalErrors";
import SearchBar from "../components/common/SearchBar";
import AllMovies from "../components/movies/Movies";
import SearchedResult from "../components/common/SearchedResult";
import useGlobalErrorsContext from "./../hooks/useGlobalErrorsContext";

const Movies = () => {
  const { searchInput, setSearchedResults, setIsLoading } = useSearchContext();
  const { setGlobalErrors } = useGlobalErrorsContext();

  useEffect(() => {
    let abortController = new AbortController();
    // SET LOADING TO TRUE
    setIsLoading(true);

    if (searchInput.length > 0) {
      const fetch = async (): Promise<void> => {
        try {
          // SEARCH FOR ONLY MOVIES
          const { data } = await axios.post("/search/movies", {
            search: searchInput,
          });
          // SET DATA TO THE STATE
          setSearchedResults(data);
          // SET LOADING TO FALSE
          setIsLoading(false);
        } catch (err) {
          // IF THERE'S ANY ERRORS ADD IT TO GLOBAL ERRORS
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
    <main className="py-4 pl-4 md:pl-[25px] lg:pl-[36px] w-full text-white">
      <GlobalErrors />
      <SearchBar placeholder="Search for movies" route="/" />
      {searchInput.length > 0 ? <SearchedResult /> : <AllMovies />}
    </main>
  );
};
export default Movies;
