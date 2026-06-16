import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./users";
import type { UpdateUserPayload } from "../../../types";


const useUpdateUser = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: UpdateUserPayload) =>{
            return updateUser(data, id)
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
};

export default useUpdateUser;