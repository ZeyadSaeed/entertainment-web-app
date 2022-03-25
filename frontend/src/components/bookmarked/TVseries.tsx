import Show from "../common/Show";

const BookmarkedTVseries = ({ tvseries }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0_15px] mb-4 lg:mb-6">
      {tvseries.map(({ show }) => (
        <Show key={show._id} show={show} category="bookmark" />
      ))}
    </ul>
  );
};
export default BookmarkedTVseries;
