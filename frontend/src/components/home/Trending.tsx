import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { ShowType } from "../../interfaces/showInterface";
import TrendingMovies from "./TrendingShows";
import { RingSpinner } from "react-spinner-overlay";

const Trending = () => {
  const [trending, setTrending] = useState<ShowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let abortController = new AbortController();
    // SET LOADING TO TRUE
    setIsLoading(true);

    const fetch = async () => {
      // FETCH TRENDING DATA FROM THE API
      const trending = await axios.get("/trending");
      // SET IT TO THE STATE
      setTrending(trending.data);
      // SET LOADING TO FALSE
      setIsLoading(false);
    };
    fetch();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section
      className={`text-white relative max-w-[2300px] ${
        isLoading ? "pb-[180px]" : "overflow-hidden"
      }`}
    >
      <h1 className="text-[20px] md:text-[32px] font-light">Trending</h1>
      {isLoading ? (
        <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] flex justify-center">
          <RingSpinner size={52} color="white" />
        </div>
      ) : (
        <TrendingMovies trending={trending} />
      )}
    </section>
  );
};
export default Trending;
