import type { Credentials } from "../types";
import { api } from "./client";

export const login = async (credentials: Credentials) => api.post("/auth/login", {email: credentials.username, pass: credentials.password});
export const getSelf = async () => api.get("/auth/self");