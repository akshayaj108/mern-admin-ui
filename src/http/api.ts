import type { Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/auth/login", {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const users = () => api.get("/users")
