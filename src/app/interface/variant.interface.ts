export interface IVariant {
  id?: number;
  product_id: number;
  size_id: number;
  color_id: number;
  stock: number;
  product?: {
    name: string
  },
  size?: {
    id: number;
    size_label: string;
  };
  color?: {
    id: number;
    color_name: string;
    color_code: string;
  };
}
