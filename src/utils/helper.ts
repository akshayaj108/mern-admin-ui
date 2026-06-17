import type { ProductQueryData, QueryData } from "../types";

export const toSearchString = (query?: QueryData | ProductQueryData) =>
  new URLSearchParams(
        Object.entries(query ?? {}).reduce<Record<string, string>>((params, [key, value]) => {
          if (value !== undefined && value !== null) {
            params[key] = String(value);
          }else{
            params[key] = '';
          }
          
          return params
        }, {}),
  ).toString();