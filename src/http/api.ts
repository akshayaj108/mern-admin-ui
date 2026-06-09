import type { CreateUser, Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/auth/login", {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsersApi = () => api.get("/users");
export const restaurants = () => api.get("/tenants");
export const createUserApi = (data: CreateUser) => api.post(`${data.role==="customer"?"/auth/register": "/users"}`, data)
