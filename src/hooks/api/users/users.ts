import { createUserApi, getUsersApi, updateUserApi } from "../../../http/api";
import type { CreateUser, User, UserResponse } from "../../../types";

export const getUsers = async (query: string): Promise<UserResponse> => {
    const response = await getUsersApi(query);
    return response.data;
};

export const createUser = async (data: CreateUser) =>{
    const response = await createUserApi(data);
    return response.data;
}

export const updateUser = async (data: User, id: number) =>{
    const response = await updateUserApi(data, id);
    return response.data;
}