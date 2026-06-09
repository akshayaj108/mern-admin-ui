import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTenant } from "./tenant"

const useCreateRestaurant = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTenant,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["tenants"]
            })
        }
    });
};

export default useCreateRestaurant;