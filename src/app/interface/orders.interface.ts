export interface IOrder {
    id: number | string;
    orderCode: string;
    customerName: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
}
