import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRestaurants } from "./tenant";
import type { QueryData } from "../../../types";



const useGetTenants = (query?: QueryData) =>{
    return useQuery({
    queryKey: ["tenants", query],
    queryFn: () =>{
        const queryString = new URLSearchParams(query).toString();
        return getRestaurants(queryString)
    },
    placeholderData: keepPreviousData,
     // staleTime: Infinity, // never becomes stale
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
});
};
export default useGetTenants;