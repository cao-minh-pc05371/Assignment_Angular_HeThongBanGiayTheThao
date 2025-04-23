export interface IOrder {
    id?: number;
    user_id: number;
    address_id: number;
    order_date: string;
    status: string;
    note?: string;
    createdAt?: string;

    user?: {
        id: number;
        name: string;
        email: string;
        phone: string;
        role: string;
    };

    address?: {
        id: number;
        user_id: number;
        recipient_name: string;
        phone: string;
        address: string;
        note: string;
    };
}
