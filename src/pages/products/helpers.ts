import type { CreateProduct } from "./types";

export const makeMultiParForm = (data: CreateProduct) =>{
    const formData = new FormData();

    Object.entries(data).map(([key, value]) =>{
        if(key == "image"){
            formData.append(key, value as File);
        }else if(key === "priceConfiguration" || key === "attributes"){
            formData.append(key, JSON.stringify(value));
        }else{
            formData.append(key, value as string);
        }
    });
    return formData;
}