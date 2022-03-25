import { ShowType } from "../../interfaces/showInterface";
import Show from "./../common/Show";

const AllTVseries = ({ tvseries }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0_15px] mb-4 lg:mb-6">
      {tvseries.map((tvseries: ShowType) => (
        <Show key={tvseries._id} show={tvseries} category="tvseries" />
      ))}
    </ul>
  );
};
export default AllTVseries;
