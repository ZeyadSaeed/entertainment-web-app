import { ShowType } from "../../interfaces/showInterface";
import Movie from "../common/Show";

const AllMovies = ({ movies }: { movies: ShowType[] }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0_15px] mb-4 lg:mb-6">
      {movies.map((movie) => (
        <Movie key={movie._id} show={movie} category="movies" />
      ))}
    </ul>
  );
};
export default AllMovies;
