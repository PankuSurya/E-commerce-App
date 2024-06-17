export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  variants?: Variant[];
}

export interface Variant {
  size: string;
  color: string;
  stock: number;
}
