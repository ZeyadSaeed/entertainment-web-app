import { useEffect } from "react";
import { RingSpinner } from "react-spinner-overlay";
import axios from "../../api/axios";
import BookmarkedMovies from "./Movies";
import useBookmarkContext from "../../hooks/useBookmarkContext";

const Bookmarked = () => {
  const {
    isMoviesLoading,
    bookmarkedMovies,
    setIsMoviesLoading,
    setBookmarkedMovies,
  } = useBookmarkContext();

  useEffect(() => {
    let abortController = new AbortController();

    const fetch = async (): Promise<void> => {
      setIsMoviesLoading(true);

      const { data } = await axios.get("/bookmarked/movies");
      setBookmarkedMovies(data.bookMarkedMovies);
      setIsMoviesLoading(false);
    };

    fetch();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={`text-white relative top-[-6px] md:top-0 md:mt-[4px] lg:mt-[5px] lg:pr-[36px] md:pr-[25px] pr-[16px] ${
        isMoviesLoading && "pb-[230px]"
      }`}
    >
      <h1 className="text-[20px] md:text-[32px] font-light">
        Bookmarked Movies
      </h1>
      {isMoviesLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <RingSpinner size={52} color="white" />
        </div>
      ) : bookmarkedMovies.length > 0 ? (
        <BookmarkedMovies movies={bookmarkedMovies} />
      ) : (
        <h2 className="text-center text-base md:text-[24px] opacity-75 my-20">
          Bookmarked movies is empty
        </h2>
      )}
    </section>
  );
};
export default Bookmarked;
