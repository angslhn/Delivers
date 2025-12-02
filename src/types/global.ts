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

export type Alert = {
  alertCode: number;
  alertShow: boolean;
  alertTitle: string | null;
  alertDescription: string | null;
  alertConfirm?: () => void;
  alertCancel?: () => void;
};

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

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  fullname: string;
  email: string;
  password: string;
}

export interface VerifyEmail {
  token: string;
  otp: string;
}

export interface UserCreate {
  id: number;
  fullname: string;
  email: string;
  password: string;
  token: string;
  token_expired: string;
  otp: string;
  otp_expired: string;
}

export interface UserData {
  id?: number;
  fullname?: string;
  email?: string;
  password?: string;
  phone_number?: string | null;
  status?: "active" | "pending" | "deleted";
  role?: "customer" | "seller" | "admin";
  avatar?: string | null;
  token?: string | null;
  token_expired?: Date | null;
  otp?: string | null;
  otp_expired?: Date | null;
  last_login?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserDataPacket extends UserData, RowDataPacket {}
