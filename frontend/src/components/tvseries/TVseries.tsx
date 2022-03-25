import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { ShowType } from "../../interfaces/showInterface";
import AllTVseries from "./AllTVseries";
import { RingSpinner } from "react-spinner-overlay";

const TVseries = () => {
  const [tvseries, setTVseries] = useState<ShowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // SET LOADING TO TRUE
    setIsLoading(true);
    let abortController = new AbortController();

    let fetch = async (): Promise<void> => {
      // FETCH TV SERIES FROM TH API
      const { data }: { data: ShowType[] } = await axios.get("/tvseries");
      // SET IT TO THE STATE
      setTVseries(data);
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
      <h1 className="text-[20px] md:text-[32px] font-light">TV Series</h1>
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <RingSpinner size={52} color="white" />
        </div>
      ) : (
        <AllTVseries tvseries={tvseries} />
      )}
    </section>
  );
};
export default TVseries;
