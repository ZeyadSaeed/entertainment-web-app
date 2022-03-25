import { useLocation, Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const token: string = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
