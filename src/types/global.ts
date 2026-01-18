import type { RowDataPacket } from "mysql2";

export type Env = {
  dbHost: string | undefined;
  dbPort: number | undefined;
  dbUser: string | undefined;
  dbName: string | undefined;
  dbPassword: string | undefined;
  jwtSecure: string | undefined;
  cookieName: string | undefined;
};

export type Alert = {
  alertCode: number;
  alertShow: boolean;
  alertTitle: string | null;
  alertDescription: string | null;
  alertConfirm?: () => void;
  alertCancel?: () => void;
};

export type Product = {
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
};

export type JSONProduct = {
  limit: number;
  products: [Product];
  skip: number;
  total: number;
};

export type UserData = {
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
  expired_at: Date | null;
  login_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type IgnoreCreate = "phone_number" | "status" | "role" | "avatar" | "login_at" | "expired_at" | "created_at" | "updated_at";

export type UserCreate = Omit<UserData, IgnoreCreate> & { expired_at: string };

type DateField = "expired_at" | "login_at" | "created_at" | "updated_at";

export type UserEdit = Omit<UserData, DateField> & {
  expired_at: string | null;
  login_at: string | null;
};

type IgnorePayload = "status" | "token" | "otp" | "expired_at" | "login_at" | "created_at" | "updated_at";

export type UserPayload = Omit<UserData, IgnorePayload>;

export type UserDataPacket = UserData & RowDataPacket;

export type AuthResponse = {
  message: {
    title: string;
    description: string;
  };
  token?: string | null;
  delay?: number;
};

export type Delay = {
  set: boolean;
  minute: number;
};
