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
<<<<<<< HEAD
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
=======
    category_id?: number;
    brand_id?: number;
    category?: {
      name: string;
    };
    brand?: {
      name: string;
    };
  }
  
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
