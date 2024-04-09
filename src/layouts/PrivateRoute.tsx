import { ReactNode } from "react";
import { useAuthCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const token = useAppSelector(useAuthCurrentToken);

  if (!token) {
    return <Navigate to={`/auth/login`} replace state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
