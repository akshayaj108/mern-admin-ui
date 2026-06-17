import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./handler";

export const useAddProduct = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['product'],
        mutationFn: (formData: FormData) => addProduct(formData),
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['products']})
            return;
        }
    })
}