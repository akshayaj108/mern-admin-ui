import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store"


const NonAuthBoard = () => {
    const { user } = useAuthStore();
    if(user !== null){
        return <Navigate to={'/'} replace={true} />
    }
  return (
   <>
    <div>NonAuthBoard</div>
    <Outlet />
   </>
  )
}

export default NonAuthBoard