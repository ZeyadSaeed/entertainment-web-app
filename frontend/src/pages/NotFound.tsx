import NotFound from "../components/notfound/NotFound";
import ChangePageTitle from "./../components/ChangePageTitle";

const NotFoundPage = () => {
  return (
    <>
      <ChangePageTitle pageTitle="Not found" />
      <NotFound />
    </>
  );
};
export default NotFoundPage;
