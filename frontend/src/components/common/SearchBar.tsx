import { ChangeEvent } from "../../types/formTypes";
import useSearchContext from "../../hooks/useSearchContext";
import { SearchBarInterface } from "./../../interfaces/searchBarInterface";

const SearchBar = ({ placeholder }: SearchBarInterface) => {
  const { searchInput, setSearchInput } = useSearchContext();

  const onSearch = (e: ChangeEvent) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex gap-4 w-[calc(100%-36px)] h-6 md:h-8 items-center mt-[6px] md:mt-[14px] lg:mt-[48px] mb-[24px]">
      <label htmlFor="search" className="relative md:bottom-1">
        <img
          src="/assets/icon-search.svg"
          className="w-[25.5px] md:w-[33px]"
          alt="Search"
        />
      </label>

      <input
        className="bg-transparent font-light w-full text-white outline-none lg:hover:border-b-[1px] text-base md:text-2xl placeholder:text-base md:placeholder:text-2xl
        lg:border-greyishBlue relative lg:top-1 lg:focus:border-b-[1px] border-greyishBlue lg:pb-[14px] lg:w-full"
        id="search"
        onChange={(e) => onSearch(e)}
        value={searchInput}
        type="text"
        autoComplete="false"
        placeholder={placeholder}
      />
    </div>
  );
};
export default SearchBar;
