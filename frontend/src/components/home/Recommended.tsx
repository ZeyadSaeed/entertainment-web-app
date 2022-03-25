import { useEffect, useState } from "react";
import axios from "../../api/axios";
import RecommendedMovies from "./RecommendedMovies";
import { ShowType } from "../../interfaces/showInterface";
import { RingSpinner } from "react-spinner-overlay";

const Recommended = () => {
  const [recommended, setRecommended] = useState<ShowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let abortController = new AbortController();
    // SET IS LOADING TO TRUE
    setIsLoading(true);

    const fetch = async (): Promise<void> => {
      // FETCH RECOMMENDED DATA
      const { data } = await axios.get("/recommended");
      // PUT THE RECOMMENDED DATA TO THE STATE
      setRecommended(data);
      // SET IS LOADING TO FALSE
      setIsLoading(false);
    };

    fetch();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section
      className={`text-white relative top-[-6px] md:top-0 md:mt-[4px] lg:mt-[5px] lg:pr-[36px] md:pr-[25px] pr-[16px] min-h-[200px] ${
        isLoading && "min-w-[80vw]"
      }`}
    >
      <h1 className="text-[20px] md:text-[32px] font-light">
        Recommended for you
      </h1>
      {isLoading ? (
        <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-[0%] flex justify-center">
          <RingSpinner size={52} color="white" />
        </div>
      ) : (
        <RecommendedMovies recommended={recommended} />
      )}
    </section>
  );
};
export default Recommended;
