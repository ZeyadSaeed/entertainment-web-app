// LIBRARIES
import { useState } from "react";
// CUSTOM HOOKS
import useBookmarked from "../../hooks/useBookmarked";
import useAddRemoveBookmark from "../../hooks/useAddRemoveBookmark";
// COMPONENTS
import PlayButtonHover from "../common/PlayButtonHover";
import BookmarkButton from "../common/BookmarkButton";

const TrendingMovie = ({ movie }) => {
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addAndRemoveBookmark } = useAddRemoveBookmark(
    isBookMarked,
    setIsLoading,
    setIsBookMarked,
    movie
  );

  const bookmark = () => {
    // ON BOOKMARK CLICK ADD OR REMOVE THE SHOW FROM BOOKMARKED
    addAndRemoveBookmark();
  };

  const thumbPath = movie.thumbnail.trending;

  // HOOK TO CHECK FOR THE USER BOOKMARKED AND SHOW IT TO THE UI ON PAGE RELOAD
  useBookmarked(setIsLoading, setIsBookMarked, movie, "all");
  return (
    <li className="min-w-[240px] md:min-w-[470px] my-4 mr-4 relative cursor-pointer group">
      <div className="relative inline-block">
        <div className="relative">
          <picture className="peer">
            <source media="(min-width: 768px)" srcSet={thumbPath.large} />
            <img
              className="rounded-[8px] blackScreen peer w-full h-auto"
              src={thumbPath.small}
              alt={movie.title}
            />
          </picture>

          <BookmarkButton
            isBookMarked={isBookMarked}
            isLoading={isLoading}
            bookmark={bookmark}
            trending={true}
          />
          <PlayButtonHover />
        </div>

        <div className="absolute z-50 bottom-4 left-4 pointer-events-none">
          <div className="flex text-[12px] md:text-[15px] opacity-75 gap-[8px] items-center">
            <p className="font-light">{movie.year}</p>
            <div className="w-[3px] h-[3px] opacity-50 bg-white rounded-full" />
            <p className="font-light flex items-center gap-[6px]">
              <img
                src={
                  movie.category === "Movie"
                    ? "/assets/icon-category-movie.svg"
                    : "/assets/icon-category-tv.svg"
                }
                alt={movie.category === "Movie" ? "movie" : "tv series"}
              />
              {movie.category}
            </p>
            <div className="w-[3px] h-[3px] opacity-50 bg-white rounded-full" />
            <p className="font-light">{movie.rating}</p>
          </div>

          <h1 className="md:text-[24px] font-medium">{movie.title}</h1>
        </div>
      </div>
    </li>
  );
};
export default TrendingMovie;
