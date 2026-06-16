import type { QueryData } from "../types";

export const toSearchString = (query?: QueryData) =>
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