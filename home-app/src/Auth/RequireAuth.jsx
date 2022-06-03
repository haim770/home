import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const role = JSON.stringify(allowedRoles);
  console.log(auth?.roles);
  console.log(allowedRoles);
  console.log(role.includes(auth?.roles));
  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  return role.includes(auth?.roles) ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
