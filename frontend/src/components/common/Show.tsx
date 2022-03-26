import { useState } from "react";
import useBookmarked from "../../hooks/useBookmarked";
import useAddRemoveBookmark from "../../hooks/useAddRemoveBookmark";
import PlayButtonHover from "./PlayButtonHover";
import BookmarkButton from "./BookmarkButton";
import useBookmarkContext from "./../../hooks/useBookmarkContext";

const Show = ({ show, category }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);

  const {
    bookmarkedMovies,
    setBookmarkedMovies,
    bookmarkedTVSeries,
    setBookmarkedTVSeries,
  } = useBookmarkContext();

  const { addAndRemoveBookmark } = useAddRemoveBookmark(
    isBookMarked,
    setIsLoading,
    setIsBookMarked,
    show
  );

  const bookmark = (): void => {
    if (category === "bookmark" && show.category === "Movie" && isBookMarked) {
      const bookmarked = [...bookmarkedMovies];
      const newBookmarked = bookmarked.filter((b) => b.show._id !== show._id);
      setBookmarkedMovies(newBookmarked);
      addAndRemoveBookmark();
      return;
    }

    if (
      category === "bookmark" &&
      show.category === "TV Series" &&
      isBookMarked
    ) {
      const bookmarked = [...bookmarkedTVSeries];
      const newBookmarked = bookmarked.filter((b) => b.show._id !== show._id);
      setBookmarkedTVSeries(newBookmarked);
      addAndRemoveBookmark();
      return;
    }
    addAndRemoveBookmark();
  };

  const thumbPath = show.thumbnail.regular;

  // HOOK TO CHECK FOR THE USER BOOKMARKED AND SHOW IT TO THE UI ON PAGE RELOAD
  useBookmarked(setIsLoading, setIsBookMarked, show, category);

  return (
    <li className="group relative cursor-pointer mt-4 lg:mt-6">
      <div className="relative">
        <picture className="peer">
          <source media="(min-width: 1440px)" srcSet={thumbPath.large} />
          <source media="(min-width: 768px)" srcSet={thumbPath.medium} />
          <img
            className="rounded-lg blackScreen w-full h-auto"
            src={thumbPath.small}
            alt={show.title}
          />
        </picture>

        <PlayButtonHover />
        <BookmarkButton
          isLoading={isLoading}
          isBookMarked={isBookMarked}
          bookmark={bookmark}
          trending={false}
        />
      </div>

      <div className="z-50 pointer-events-none">
        <div className="flex mt-[8px] mb-[4px] md:mb-[5px] text-[11px] md:text-[13px] opacity-75 gap-[8px] items-center">
          <p className="font-light">{show.year}</p>
          <div className="w-[3px] h-[3px] opacity-50 bg-white rounded-full" />
          <p className="font-light flex items-center gap-[6px]">
            <img
              src={
                show.category === "Movie"
                  ? "/assets/icon-category-movie.svg"
                  : "/assets/icon-category-tv.svg"
              }
              alt={show.category === "Movie" ? "movie" : "tv series"}
            />
            {show.category}
          </p>
          <div className="w-[3px] h-[3px] opacity-50 bg-white rounded-full" />
          <p className="font-light">{show.rating}</p>
        </div>

        <h1 className="text-[14px] font-medium md:text-[24px]">{show.title}</h1>
      </div>
    </li>
  );
};
export default Show;
