import { useEffect } from "react";
import axios from "../api/axios";
import useGlobalErrorsContext from "../hooks/useGlobalErrorsContext";
// COMPONENTS
import SearchBar from "../components/common/SearchBar";
import Trending from "../components/home/Trending";
import GlobalErrors from "../components/globalErrors/GlobalErrors";
import Recommended from "../components/home/Recommended";
import useSearchContext from "../hooks/useSearchContext";
import SearchedResult from "../components/common/SearchedResult";

const Home = () => {
  const { searchInput, setSearchedResults, setIsLoading } = useSearchContext();
  const { setGlobalErrors } = useGlobalErrorsContext();

  useEffect(() => {
    let abortController = new AbortController();
    // SET LOADING TO TRUE
    setIsLoading(true);

    if (searchInput.length > 0) {
      const fetch = async (): Promise<void> => {
        try {
          // FETCH SEARCHED DATA
          const { data } = await axios.post("/search", {
            search: searchInput,
          });
          // SET DATA TO THE STATE
          setSearchedResults(data);
          // SET LOADING TO FALSE
          setIsLoading(false);
        } catch (err) {
          const message = err?.response?.data;
          // SET ERROR TO THE GLOBAL ERROR
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
    <main className="py-4 pl-4 md:pl-[25px] lg:pl-[36px] overflow-hidden">
      <GlobalErrors />
      <SearchBar placeholder="Search for movies or TV series" route="/" />
      {searchInput.length > 0 ? (
        <SearchedResult />
      ) : (
        <>
          <Trending />
          <Recommended />
        </>
      )}
    </main>
  );
};
export default Home;
