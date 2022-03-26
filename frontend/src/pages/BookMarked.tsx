import GlobalErrors from "../components/globalErrors/GlobalErrors";
import SearchBar from "../components/common/SearchBar";
import BookmarkedMovies from "../components/bookmarked/BookmarkedMovies";
import BookmarkedTVseries from "../components/bookmarked/BookmarkedTVSeries";
import useSearchContext from "../hooks/useSearchContext";
import { useEffect } from "react";
import axios from "../api/axios";
import SearchedResult from "../components/common/SearchedResult";
import useGlobalErrorsContext from "./../hooks/useGlobalErrorsContext";

const BookMarked = () => {
  const { searchInput, setSearchedResults, setIsLoading } = useSearchContext();
  const { setGlobalErrors } = useGlobalErrorsContext();

  useEffect(() => {
    let abortController = new AbortController();
    // SET LOADING TO TRUE
    setIsLoading(true);

    if (searchInput.length > 0) {
      const fetch = async (): Promise<void> => {
        try {
          // FETCH DATA BASED ON USER SEARCH INPUT
          const { data } = await axios.post("/search/bookmark", {
            search: searchInput,
          });
          // REMOVE RESULTS EQUAL TO NULL
          const result = data.filter((r) => r !== null);
          // ADD IT TO SEARCHED RESULT
          setSearchedResults(result);
          // SET IS LOADING TO FALSE
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
      // IF THERE IS NO SEARCH INPUT CLEAR SEARCHED RESULTS
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
      <SearchBar placeholder="Search for bookmarked shows" route="/" />
      {searchInput.length > 0 ? (
        <SearchedResult />
      ) : (
        <>
          <BookmarkedMovies />
          <BookmarkedTVseries />
        </>
      )}
    </main>
  );
};
export default BookMarked;
