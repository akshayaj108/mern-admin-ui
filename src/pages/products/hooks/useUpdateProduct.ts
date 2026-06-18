import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "./handler"
import type { UpdateProductPayload } from "../types"

export const useUpdateProduct = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['product'],
        mutationFn: ({data, id}: UpdateProductPayload) =>{
            return updateProduct(data, id)
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ['products']})
        }
    })
}