export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string
};
export type UserResponse ={
  data: User[],
  currentPage: number,
  perPage: number,
  total: number
}
export type CreateUser ={
  firstName: string,
  lastName: string,
  email: string,
  pass: string,
  role: string,
  tenantId?: number
}

export type Tenant = {
  id: number,
  name: string,
  address: string,
  createdAt: string,
  updatedAt: string
}

export type CreateTenantData = {
  name: string,
  address: string
}

export type QueryData ={
  currentPage: string,
  perPage: string
}

export type FieldData ={
  q: string,
  role?: string
}