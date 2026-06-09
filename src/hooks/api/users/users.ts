import { createUserApi, getUsersApi } from "../../../http/api";
import type { CreateUser, UserResponse } from "../../../types";

export const getUsers = async (query: string): Promise<UserResponse> => {
    const response = await getUsersApi(query);
    return response.data;
};

export const createUser = async (data: CreateUser) =>{
    const response = await createUserApi(data);
    return response.data;
}