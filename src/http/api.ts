import type { CreateTenantData, CreateUser, Credentials, User } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";

export const login = (credentials: Credentials) => api.post(`${AUTH_SERVICE}/auth/login`, {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post("/auth/logout");
export const getUsersApi = (queryString: string) => api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const restaurantsApi = (queryString: string) => api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createUserApi = (data: CreateUser) => api.post(`${AUTH_SERVICE}${data.role==="customer"?"/auth/register": "/users"}`, data)
export const createRestaurantApi = (data: CreateTenantData) => api.post(`${AUTH_SERVICE}/tenants`, data);
export const updateUserApi = (data: User, id: number) => api.patch(`${AUTH_SERVICE}/users/${id}`,data)
