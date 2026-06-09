import { createUserApi, getUsersApi } from "../../../http/api";
import type { CreateUser, User } from "../../../types";

export const getUsers = async (): Promise<User[]> => {
    const response = await getUsersApi();
    return response.data;
};

export const createUser = async (data: CreateUser) =>{
    const response = await createUserApi(data);
    return response.data;
}