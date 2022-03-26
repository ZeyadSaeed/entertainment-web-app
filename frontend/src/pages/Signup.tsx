import Logo from "../components/common/Logo";
import SignupForm from "../components/signup/Signup";
import ChangePageTitle from "./../components/ChangePageTitle";

const SingUp = () => {
  return (
    <main className="flex items-center w-screen h-screen flex-col px-6">
      <ChangePageTitle pageTitle="Sign up" />
      <Logo classes="my-[7.2vh] md:my-[9vh]" />
      <SignupForm formName="signup" />
    </main>
  );
};
export default SingUp;
