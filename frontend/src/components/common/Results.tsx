import { ShowType } from "../../interfaces/showInterface";
import Show from "./Show";

const Results = ({ searchedResults }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0_15px] mb-4 lg:mb-6">
      {searchedResults.map((result: ShowType) => (
        <Show key={result._id} show={result} category="all" />
      ))}
    </ul>
  );
};
export default Results;
