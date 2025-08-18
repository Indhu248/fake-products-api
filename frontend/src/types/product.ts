export interface ProductVariant {
  variant_id: string;
  color: string;
  size: string;
  stock: number;
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface Product {
  _id?: string;
  id: string;
  sku: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  currency: string;
  categories: string[];
  images: string[];
  variants: ProductVariant[];
  ratings: ProductRating;
  tags: string[];
  created_at?: string;
  updated_at?: string;
  is_active: boolean;
}

export interface ProductFormData extends Omit<Product, '_id' | 'created_at' | 'updated_at'> {}

export interface ProductResponse {
  status: string;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface SingleProductResponse {
  status: string;
  data: Product;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parent_category?: Category;
  is_active: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  status: string;
  data: Category[];
}
