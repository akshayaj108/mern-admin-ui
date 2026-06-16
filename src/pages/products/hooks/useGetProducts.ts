import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryData } from "../../../types";
import { AxiosError } from "axios";
import { getProducts } from "./handler";

const useGetProducts = (query?: QueryData) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => {
      const queryString = new URLSearchParams(query).toString();
      return getProducts(queryString);
    },
    placeholderData: keepPreviousData,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    // staleTime: Infinity, // never becomes stale
    refetchOnWindowFocus: false, // don't refetch when switching tabs
    refetchOnReconnect: false, // don't refetch on internet reconnect
    refetchOnMount: false,
  });
};
export default useGetProducts;
