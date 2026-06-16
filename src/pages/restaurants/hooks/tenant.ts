import { createRestaurantApi, restaurantsApi } from "../../../http/api";
import type { CreateTenantData, TenantResponse } from "../../../types";

export const getRestaurants = async (query: string): Promise<TenantResponse> => {
  const response = await restaurantsApi(query);
  return response.data;
};

export const createTenant = async (data: CreateTenantData) =>{
const response = await createRestaurantApi(data);
return response.data;
}