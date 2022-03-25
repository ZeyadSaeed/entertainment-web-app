import { SingButtonInterface } from "../../interfaces/formInterface";
import PulseLoader from "react-spinners/PulseLoader";

const SingButton = ({ text, formName, isLoading }: SingButtonInterface) => {
  return (
    <button
      className={`w-full bg-red rounded-[6px] font-light text-white h-12 flex items-center justify-center hover:bg-white hover:text-black ${
        formName === "login" ? "mt-[16px]" : "mt-0"
      } ${isLoading && "hover:bg-red"}`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <PulseLoader color="white" size={10} /> : text}
    </button>
  );
};
export default SingButton;
