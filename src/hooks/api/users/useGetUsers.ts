import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./users";

const useGetUsers = () =>{

    return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
export default useGetUsers;