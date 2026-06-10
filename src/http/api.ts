import type { CreateTenantData, CreateUser, Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/auth/login", {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsersApi = (queryString: string) => api.get(`/users?${queryString}`);
export const restaurantsApi = () => api.get("/tenants");
export const createUserApi = (data: CreateUser) => api.post(`${data.role==="customer"?"/auth/register": "/users"}`, data)
export const createRestaurantApi = (data: CreateTenantData) => api.post("/tenants", data)
