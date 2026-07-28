import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

type Props = {
  allowedRoles: string[];
};

const RoleProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;