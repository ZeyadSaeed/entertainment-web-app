import { useEffect } from "react";
import axios from "./../../api/axios";
import useBookmarkContext from "./../../hooks/useBookmarkContext";
import { RingSpinner } from "react-spinner-overlay";
import TVseries from "./../bookmarked/TVseries";

const BookmarkedTVseries = () => {
  const {
    bookmarkedTVSeries,
    setBookmarkedTVSeries,
    isTVSeriesLoading,
    setIsTVSeriesLoading,
  } = useBookmarkContext();

  useEffect(() => {
    let abortController = new AbortController();

    const fetch = async (): Promise<void> => {
      setIsTVSeriesLoading(true);

      const { data } = await axios.get("/bookmarked/tvseries");
      setBookmarkedTVSeries(data.bookMarkedTvSeries);
      setIsTVSeriesLoading(false);
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
        isTVSeriesLoading && "pb-[320px]"
      }`}
    >
      <h1 className="text-[20px] md:text-[32px] font-light">
        Bookmarked TV Series
      </h1>
      {isTVSeriesLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <RingSpinner size={52} color="white" />
        </div>
      ) : bookmarkedTVSeries.length > 0 ? (
        <TVseries tvseries={bookmarkedTVSeries} />
      ) : (
        <h2 className="text-center text-base md:text-[24px] opacity-75 mt-20">
          Bookmarked TV series is empty
        </h2>
      )}
    </section>
  );
};
export default BookmarkedTVseries;
