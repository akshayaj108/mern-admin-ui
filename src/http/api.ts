import type { CreateTenantData, CreateUser, Credentials, User } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api";
export const CATELOG_SERVICE = "/api/catelog";

export const login = (credentials: Credentials) => api.post(`${AUTH_SERVICE}/auth/login`, {email: credentials.username, pass: credentials.password});
export const getSelf = () => api.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);
export const getUsersApi = (queryString: string) => api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const restaurantsApi = (queryString: string) => api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createUserApi = (data: CreateUser) => api.post(`${AUTH_SERVICE}${data.role==="customer"?"/auth/register": "/users"}`, data)
export const createRestaurantApi = (data: CreateTenantData) => api.post(`${AUTH_SERVICE}/tenants`, data);
export const updateUserApi = (data: User, id: number) => api.patch(`${AUTH_SERVICE}/users/${id}`,data);

//catelog services

export const getCategoryListApi = (queryString: string) => api.get(`${CATELOG_SERVICE}/categories?${queryString}`);
export const getCategoryByIdApi = (id: string) => api.get(`${CATELOG_SERVICE}/categories/${id}`)

//catelog products
export const getProductstApi = (queryString: string) => api.get(`${CATELOG_SERVICE}/products?${queryString}`);
export const addProductApi = (data: FormData) => api.post(`${CATELOG_SERVICE}/products`, data,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
