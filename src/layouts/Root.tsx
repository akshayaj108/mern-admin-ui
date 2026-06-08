import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { getSelf } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";

const getLoginUserData = async () => {
  const { data } = await getSelf();
  return data;
};
const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getSelf"],
    queryFn: getLoginUserData,
    // staleTime: Infinity, // never becomes stale
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return <Outlet />;
};

export default Root;
