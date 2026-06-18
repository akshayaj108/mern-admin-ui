import { addProductApi, getCategoryListApi, getProductstApi, updateProductApi } from "../../../http/api";
import type { ProductResponse } from "../types";

export const getCategories = async (query: string): Promise<void> => {
    const response = await getCategoryListApi(query);
    return response.data;
};

export const getProducts = async (query: string): Promise<ProductResponse> => {
    const response = await getProductstApi(query);
    return response.data;
};

export const addProduct = async (data: FormData) =>{
    const response = await addProductApi(data);
    return response.data;
}
export const updateProduct = async (data: FormData, id: string) =>{
    const response = await updateProductApi(data, id);
    return response.data;
}

