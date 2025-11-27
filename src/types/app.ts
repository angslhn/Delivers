import { RowDataPacket } from "mysql2";

export interface Token {
  data: string;
}

export interface Env {
  dbHost: string | undefined;
  dbPort: number | undefined;
  dbUser: string | undefined;
  dbName: string | undefined;
  dbPassword: string | undefined;
  cookieName: string | undefined;
}

export interface Product {
  availabilityStatus: string;
  brand: string;
  description: string;
  id: number;
  images: [string];
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  stock: number;
  title: string;
}

export interface JSONProduct {
  limit: number;
  products: [Product];
  skip: number;
  total: number;
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface FormRegister extends FormLogin {
  fullname: string;
}

export interface UserData extends FormRegister {
  id: number;
}

export interface UserDataPacket extends UserData, RowDataPacket {}
