import { restaurants } from "../../../http/api";

export const getRestaurants = async () => {
  const response = await restaurants();
  return response.data;
};