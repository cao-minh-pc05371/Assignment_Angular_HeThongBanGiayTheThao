export interface IOrderClient {
  id: number | string;
  user_id: number | string;
  address_id?: number | string|null;
  orderDate: string;
  note?: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | string;
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string; // Thêm trường optional này
}
