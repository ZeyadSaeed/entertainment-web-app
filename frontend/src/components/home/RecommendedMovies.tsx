import Show from "../common/Show";

const RecommendedMovies = ({ recommended }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0_15px] mb-4 lg:mb-6">
      {recommended.map((movie) => (
        <Show key={movie._id} show={movie} category="all" />
      ))}
    </ul>
  );
};
export default RecommendedMovies;
