export interface Token {
  data: string;
}

export interface Env {
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

export interface SignupForm {
  fullname: string;
  email: string;
  password: string;
}
