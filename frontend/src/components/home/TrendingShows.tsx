import { useEffect, useRef, WheelEvent } from "react";
import { ShowType } from "../../interfaces/showInterface";
import TrendingMovie from "./TrendingShow";

const TrendingMovies = ({ trending }: { trending: ShowType[] }) => {
  const slideContainer = useRef(null);

  useEffect(() => {
    const container = slideContainer.current;

    // ADD SCROLL HORIZONTALLY TO THE TRENDING SHOWS
    container.addEventListener("wheel", scrollHorizontally, {
      passive: false,
    });

    return () =>
      container.removeEventListener("wheel", scrollHorizontally, {
        passive: true,
      });
  }, []);

  const scrollHorizontally = (e: WheelEvent) => {
    // PREVENT DEFAULT SCROLLING VERTICALLY TO ONLY SCROLL HORIZONTALLY
    e.preventDefault();
    if (e.deltaY > 0) slideContainer.current.scrollLeft += 200;
    else slideContainer.current.scrollLeft -= 200;
  };

  return (
    <ul
      className="flex overflow-x-scroll overflow-y-hidden max-w-full whitespace-nowrap scrollBar relative scroll-smooth"
      ref={slideContainer}
    >
      {trending.map((movie: ShowType) => (
        <TrendingMovie key={movie._id} movie={movie} />
      ))}
    </ul>
  );
};
export default TrendingMovies;
