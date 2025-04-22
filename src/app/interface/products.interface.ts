export interface IProduct {
    id?: number;
    name: string;
    description: string;
    image?: string;
    price?: number;
    sale_price?: number;
    visibility?: 'visible' | 'hidden';
    featured?: 'normal' | 'featured';
    stock?: number;
    category_id: number;
    brand_id: number;
    category?: {
      id: number;
      name: string;
    };
    brand?: {
      id: number;
      name: string;
    };
  }
