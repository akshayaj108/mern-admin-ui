export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}
export interface Attributes {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
}


export type Product = {
    _id?: string;
    image: string;
    name: string;
    description: string;
    category: string;
    status: boolean;
    createdAt: string;
}

export type CategoryResponse ={
  data: Category[],
  currentPage: number,
  perPage: number,
  total: number
}
export type ProductResponse ={
  data: Product[],
  currentPage: number,
  perPage: number,
  total: number
}

export type ProductFilterValues = {
  q?: string;
  categoryId?: string;
  tenantId?: string;
  isPublish?: boolean;
};