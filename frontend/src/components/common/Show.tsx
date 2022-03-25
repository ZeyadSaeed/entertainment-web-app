import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import useBookmarked from "../../hooks/useBookmarked";
import useAddRemoveBookmark from "../../hooks/useAddRemoveBookmark";
import PlayButtonHover from "./PlayButtonHover";
import BookmarkButton from "./BookmarkButton";
import useBookmarkContext from "./../../hooks/useBookmarkContext";

const Show = ({ show, category }) => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const isTablet: boolean = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktop: boolean = useMediaQuery({ query: "(min-width: 1440px)" });

  // HOOK TO CHECK FOR THE USER BOOKMARKED AND SHOW IT TO THE UI ON PAGE RELOAD
  useBookmarked(setIsLoading, setIsBookMarked, show, category);
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

  useEffect(() => {
    const thumbPath = show.thumbnail.regular;
    if (isDesktop) {
      setThumbnail(thumbPath.large);
    } else if (isTablet) {
      setThumbnail(thumbPath.medium);
    } else {
      setThumbnail(thumbPath.small);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet, isDesktop]);

  return (
    <li className="group relative cursor-pointer mt-4 lg:mt-6">
      <div className="relative">
        <img
          width={280}
          height={174}
          className="rounded-lg blackScreen peer w-full h-auto"
          draggable="false"
          src={thumbnail}
          alt={show.title}
        />
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
