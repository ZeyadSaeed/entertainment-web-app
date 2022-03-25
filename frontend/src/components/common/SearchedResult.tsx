import useSearchContext from "../../hooks/useSearchContext";
import { RingSpinner } from "react-spinner-overlay";
import Results from "./Results";

const SearchedResult = () => {
  const { searchInput, searchedResults, isLoading } = useSearchContext();

  return (
    <section
      className={`text-white relative top-[-6px] md:top-0 md:mt-[4px] lg:mt-[5px] lg:pr-[36px] md:pr-[25px] pr-[16px] min-h-[200px] ${
        isLoading && "min-w-[80vw]"
      }`}
    >
      <h1 className="text-[20px] md:text-[32px] font-light">
        Found {searchedResults.length} results ‘{searchInput}’
      </h1>
      {isLoading ? (
        <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-[0%] flex justify-center">
          <RingSpinner size={52} color="white" />
        </div>
      ) : (
        <Results searchedResults={searchedResults} />
      )}
    </section>
  );
};

export default SearchedResult;
