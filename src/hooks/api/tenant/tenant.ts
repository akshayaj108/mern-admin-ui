import { createRestaurantApi, restaurantsApi } from "../../../http/api";
import type { CreateTenantData } from "../../../types";

export const getRestaurants = async () => {
  const response = await restaurantsApi();
  return response.data;
};

export const createTenant = async (data: CreateTenantData) =>{
const response = await createRestaurantApi(data);
return response.data;
}