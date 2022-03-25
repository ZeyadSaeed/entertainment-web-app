import { HiOutlineEmojiSad } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%] flex flex-col items-center gap-8">
      <HiOutlineEmojiSad className="text-[150px] md:text-[200px]" />
      <h1 className="text-xl md:text-3xl text-center">
        The page you are looking for can’t be found.
      </h1>
    </div>
  );
};
export default NotFound;
