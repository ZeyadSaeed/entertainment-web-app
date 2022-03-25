import Logo from "../components/common/Logo";
import LoginForm from "../components/signin/Login";

const Login = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="flex items-center w-screen h-screen flex-col px-6">
      <Logo classes="my-[7.2vh] md:my-[9vh]" />
      <LoginForm formName="login" />
    </div>
  );
};
export default Login;
