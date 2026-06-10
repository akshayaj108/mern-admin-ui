import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuthBoard = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  if (user !== null) {
    const returnPath =
      new URLSearchParams(location.search).get("returnTo") || "/";
    return <Navigate to={returnPath} replace={true} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default NonAuthBoard;
