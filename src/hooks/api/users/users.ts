import { users } from "../../../http/api";

export const getUsers = async () => {
    const response = await users();
    return response.data;
};