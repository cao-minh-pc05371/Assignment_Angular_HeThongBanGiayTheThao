export interface IPayment {
    id?: number;
    order_id: number;
    payment_date?: string;
    amount: number;
    payment_method: 'COD' | 'Momo';
    status: 'pending' | 'completed' | 'failed';
    createdAt?: string;
    updatedAt?: string;
  }
  