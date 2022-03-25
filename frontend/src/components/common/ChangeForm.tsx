import { Link } from "react-router-dom";
import { ChangeFormInterface } from "../../interfaces/formInterface";

const ChangeForm = ({ title, formName }: ChangeFormInterface) => {
  const route = formName === "Login" ? "/login" : "/signup";
  return (
    <div className="text-center">
      <span className="text-white font-light">{title} have an account?</span>
      <Link to={route} className="text-red ml-2 font-light selection:bg-white">
        {formName}
      </Link>
    </div>
  );
};
export default ChangeForm;
