export interface ICartItem {
  id: number;
  user_id: number;
  variant_id: number;
  quantity: number;
  product_variant?: {
    id: number;
    product_id: number;
    size_id: number;
    color_id: number;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
    product?: {
      id: number;
      name: string;
      description: string;
      image: string;
      category_id: number;
      brand_id: number;
      stock: number;
      price: number;
      sale_price: number;
      createdAt?: string;
      updatedAt?: string;
      visibility?: string;
      featured?: string;
      brand?: {
        name: string;
      };
      category?: {
        name: string;
      };
    };
    size?: {
      id: number;
      name: string;
    };
    color?: {
      id: number;
      color_name: string;
      color_code: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
}
