import { ShowType } from "../interfaces/showInterface";
import axios from "../api/axios";
import useGlobalErrorsContext from "./useGlobalErrorsContext";

const useAddRemoveBookmark = (
  isBooMarked: boolean,
  setIsLoading: (loading: boolean) => void,
  setIsBookMarked: (bookmarked: boolean) => void,
  movie: ShowType
) => {
  const { setGlobalErrors } = useGlobalErrorsContext();

  const addAndRemoveBookmark = async (): Promise<void> => {
    // IF THE MOVIE OR TV SERIES NOT IN BOOKMARKED
    if (!isBooMarked) {
      try {
        // SET LOADING TRUE
        setIsLoading(true);
        // ADD MOVIE OR TV SERIES TO THE USER BOOKMARKED
        await axios.post(`/bookmarked/${movie._id}`);
        // SET LOADING TO FALSE
        setIsLoading(false);
        // SET BOOKMARKED TO TRUE TO DISPLAY TO THE USER
        setIsBookMarked(true);
      } catch (err) {
        // IF THERE'S ANY ERRORS SET LOADING TRUE
        setIsLoading(true);
        // ERROR MESSAGE
        const message: string = err?.response?.data;
        // SET LOADING TO FALSE
        setIsLoading(false);
        // ADD ERROR TO GLOBAL ERRORS TO DISPLAY TO THE USER
        setGlobalErrors((errs: string[]) => [...errs, message]);
      }
    } else {
      try {
        // SET LOADING TO TRUE
        setIsLoading(true);
        // DELETE BOOKMARKED MOVIE OR TV SERIES FROM USER BOOKMARKED
        await axios.delete(`/bookmarked/${movie._id}`);
        // SET LOADING TO FALSE
        setIsLoading(false);
        // SET BOOKMARKED TO FALSE TO REMOVE IT FROM THE USER SCREEN
        setIsBookMarked(false);
      } catch (err) {
        // IF THERE'S ANY ERRORS SET LOADING TO TRUE
        setIsLoading(true);
        // ERROR MESSAGE
        const message = err?.response?.data;
        // SET LOADING TO FALSE
        setIsLoading(false);
        // ADD ERROR MESSAGE TO GLOBAL ERRORS TO DISPLAY TO THE USER
        setGlobalErrors((errs: string[]) => [...errs, message]);
      }
    }
  };

  return { addAndRemoveBookmark };
};
export default useAddRemoveBookmark;
