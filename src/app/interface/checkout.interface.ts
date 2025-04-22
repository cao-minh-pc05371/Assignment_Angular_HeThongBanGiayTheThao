export interface ICheckout {
  user_id: number;
  address: string;
  name: string;
  phone: string;
  note?: string;
  items: {
    variant_id: number;
    quantity: number;
    price: number;
  }[];
}
