import type { RowDataPacket } from "mysql2";
import type { Dispatch, SetStateAction } from "react";

export interface Token {
  data: string;
}

export interface Env {
  dbHost: string | undefined;
  dbPort: number | undefined;
  dbUser: string | undefined;
  dbName: string | undefined;
  dbPassword: string | undefined;
  jwtSecure: string | undefined;
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
  otp: string;
  expires_at: string;
}

export interface UserUpdate {
  id?: number;
  fullname?: string;
  email?: string;
  password?: string;
  phone_number?: string | null;
  status?: "active" | "pending" | "deleted";
  role?: "customer" | "seller" | "admin";
  avatar?: string | null;
  token?: string | null;
  otp?: string | null;
  expires_at?: string | null;
  login_at?: string | null;
}
export interface UserData {
  id: number;
  fullname: string;
  email: string;
  password: string;
  phone_number: string | null;
  status: "active" | "pending" | "deleted";
  role: "customer" | "seller" | "admin";
  avatar: string | null;
  token: string | null;
  otp: string | null;
  expires_at: Date | null;
  login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserPayload {
  id: number;
  fullname: string;
  email: string;
  phone_number: string | null;
  avatar: string;
  role: "customer" | "seller" | "admin";
}

export interface UserDataPacket extends UserData, RowDataPacket {}
