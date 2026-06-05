import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
const refreshToken = async () => await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,{}, { withCredentials: true });
api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const request = error.config;
        if(error.response.status === 401 && !request._isRetry){
            try {
                request._isRetry = true;
                const headers = { ...request.headers };
                await refreshToken();
                return api.request({...request, headers});
            } catch (err) {
                console.error("Refresh token error", err);
                useAuthStore.getState().logout();
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

