import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCategoryByIdApi } from "../../../http/api"

export const useGetCategory = (id?: string) =>{
    return useQuery({
        queryKey: ["category", id],
        queryFn: () =>{
            return getCategoryByIdApi(id!)
        },
        enabled: !!id,
         // staleTime: Infinity, // never becomes stale
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
    })
}