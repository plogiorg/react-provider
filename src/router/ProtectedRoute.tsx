import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts";
import { ROUTES } from ".";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
