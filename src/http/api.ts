import type { CreateTenantData, CreateUser, Credentials, User } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/auth/login", {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsersApi = (queryString: string) => api.get(`/users?${queryString}`);
export const restaurantsApi = (queryString: string) => api.get(`/tenants?${queryString}`);
export const createUserApi = (data: CreateUser) => api.post(`${data.role==="customer"?"/auth/register": "/users"}`, data)
export const createRestaurantApi = (data: CreateTenantData) => api.post("/tenants", data);
export const updateUserApi = (data: User, id: number) => api.patch(`/users/${id}`,data)
