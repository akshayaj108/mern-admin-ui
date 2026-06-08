import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./users";

const useGetUsers = () =>{

    return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
     // staleTime: Infinity, // never becomes stale
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
  });
}
export default useGetUsers;