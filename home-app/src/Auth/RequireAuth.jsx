import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    // when the user try to get into area needed to be login we send them to the login page
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
