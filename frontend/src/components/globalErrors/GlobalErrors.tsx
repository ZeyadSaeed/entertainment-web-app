import useGlobalErrorsContext from "./../../hooks/useGlobalErrorsContext";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const GlobalErrors = () => {
  const { globalErrors } = useGlobalErrorsContext();
  return (
    <div
      className={`duration-500 flex flex-col gap-3 absolute z-[1000] opacity-0 ${
        globalErrors && "right-2 top-[3rem] opacity-100"
      }`}
    >
      {globalErrors.map((err) => (
        <div
          key={Math.random() * Date.now()}
          className="flex animation whitespace-nowrap items-center text-white bg-semiDarkBlue p-2 px-4  gap-2 rounded-[6px]"
        >
          <MdOutlineDoNotDisturb className="text-red text-lg" />
          {err}
        </div>
      ))}
    </div>
  );
};
export default GlobalErrors;
