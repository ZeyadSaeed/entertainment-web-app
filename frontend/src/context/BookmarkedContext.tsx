import { createContext, useState } from "react";
import { ShowType } from "../interfaces/showInterface";

const BookmarkContext = createContext({
  bookmarkedMovies: [],
  setBookmarkedMovies: (s: ShowType[]) => {},
  isMoviesLoading: true,
  setIsMoviesLoading: (loading: boolean) => {},
  bookmarkedTVSeries: [],
  setBookmarkedTVSeries: (s: ShowType[]) => {},
  isTVSeriesLoading: true,
  setIsTVSeriesLoading: (loading: boolean) => {},
});

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<ShowType[]>([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState<boolean>(true);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState<ShowType[]>([]);
  const [isTVSeriesLoading, setIsTVSeriesLoading] = useState<boolean>(true);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedMovies,
        setBookmarkedMovies,
        isMoviesLoading,
        setIsMoviesLoading,
        bookmarkedTVSeries,
        setBookmarkedTVSeries,
        isTVSeriesLoading,
        setIsTVSeriesLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
export default BookmarkContext;
