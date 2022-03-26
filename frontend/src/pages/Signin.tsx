import Logo from "../components/common/Logo";
import LoginForm from "../components/signin/Login";
import ChangePageTitle from "./../components/ChangePageTitle";

const Login = () => {
  return (
    <div className="flex items-center w-screen h-screen flex-col px-6">
      <ChangePageTitle pageTitle="Login" />
      <Logo classes="my-[7.2vh] md:my-[9vh]" />
      <LoginForm formName="login" />
    </div>
  );
};
export default Login;
