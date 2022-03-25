import { FormTitleInterface } from "../../interfaces/formInterface";

const FormTitle = ({ title }: FormTitleInterface) => {
  return (
    <h1 className="text-white text-[32px] font-light mb-[40px]">{title}</h1>
  );
};
export default FormTitle;
