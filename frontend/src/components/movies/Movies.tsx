import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { ShowType } from "../../interfaces/showInterface";
import AllMovies from "./AllMovies";
import { RingSpinner } from "react-spinner-overlay";

const Movies = () => {
  const [movies, setMovies] = useState<ShowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // SET LOADING TO TRUE
    setIsLoading(true);
    let abortController = new AbortController();

    let fetch = async (): Promise<void> => {
      // FETCH MOVIES DATA
      const { data }: { data: ShowType[] } = await axios.get("/movies");
      // SET MOVIE TO THE STATE
      setMovies(data);
      // SET LOADING TO FALSE
      setIsLoading(false);
    };

    fetch();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section className="text-white top-[-6px] md:top-0 md:mt-[4px] lg:mt-[5px] lg:pr-[36px] md:pr-[25px] pr-[16px]">
      <h1 className="text-[20px] md:text-[32px] font-light">Movies</h1>
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <RingSpinner size={52} color="white" />
        </div>
      ) : (
        <AllMovies movies={movies} />
      )}
    </section>
  );
};
export default Movies;
