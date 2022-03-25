import { useContext } from "react";
import BookmarkContext from "../context/BookmarkedContext";

const useBookmarkContext = () => {
  return useContext(BookmarkContext);
};

export default useBookmarkContext;
