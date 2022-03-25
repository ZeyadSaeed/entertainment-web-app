import axios from "../api/axios";
import { ShowType } from "../interfaces/showInterface";
import { useEffect } from "react";
import useGlobalErrorsContext from "./useGlobalErrorsContext";

const useBookmarked = (
  setIsLoading: (loading: boolean) => void,
  setIsBookMarked: (bookmarked: boolean) => void,
  movie: ShowType,
  category: string
) => {
  const { setGlobalErrors } = useGlobalErrorsContext();

  useEffect(() => {
    // SHOW USER BOOKMARKED TO THE UI
    const run = async () => {
      try {
        // SET LOADING TRUE
        if (category === "bookmark") {
          setIsBookMarked(true);
          return;
        }
        setIsLoading(true);
        // GET ALL USER BOOKMARKED
        const { data } = await axios.get(`/bookmarked/${category}`);
        if (category === "movies" || category === "all") {
          data.bookMarkedMovies.forEach(
            ({ show }: { show: ShowType; _id: string }) => {
              if (show._id === movie._id) {
                setIsBookMarked(true);
              }
            }
          );
        }
        if (category === "tvseries" || category === "all") {
          data.bookMarkedTvSeries.forEach(
            ({ show }: { show: ShowType; _id: string }) => {
              if (show._id === movie._id) {
                setIsBookMarked(true);
              }
            }
          );
        }
        setIsLoading(false);
      } catch (err) {
        // IF THERE'S ANY ERRORS SET LOADING TO TRUE
        setIsLoading(true);
        // ERROR MESSAGE
        const message = err?.response?.data;
        // ADD ERROR MESSAGE TO GLOBAL ERRORS TO DISPLAY TO THE USER
        setGlobalErrors((errs: string[]) => [message]);
        // SET LOADING TO FALSE
        setIsLoading(false);
      }
    };
    run();

    return () => {
      setIsBookMarked(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useBookmarked;
