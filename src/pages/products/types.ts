export type Category = { name: string; _id: string }
// export type UserResponse ={
//   data: User[],
//   currentPage: number,
//   perPage: number,
//   total: number
// }

export type Product = {
    _id?: string;
    image: string;
    name: string;
    description: string;
    category: string;
    status: boolean;
    createdAt: string;
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