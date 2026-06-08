import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "./tenant";



const useGetTenants = () =>{
    return useQuery({
    queryKey: ["tenants"],
    queryFn: getRestaurants,
     // staleTime: Infinity, // never becomes stale
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
});
};
export default useGetTenants;