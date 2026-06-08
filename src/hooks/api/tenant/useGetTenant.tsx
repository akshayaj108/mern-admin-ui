import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "./tenant";



const useGetTenants = () =>{
    return useQuery({
    queryKey: ["tenants"],
    queryFn: getRestaurants
});
};
export default useGetTenants;