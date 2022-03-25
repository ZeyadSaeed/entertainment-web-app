import { Outlet } from "react-router";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="md:p-0 min-h-screen lg:flex">
      <Header />
      <Outlet />
    </main>
  );
};
export default Layout;
