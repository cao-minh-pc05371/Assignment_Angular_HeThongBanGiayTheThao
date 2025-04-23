export interface IOrder {
    id: string; // Changed from number to string
    name: string;
    phone: string;
    address: string;
    note?: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    order_date: string;
    total_amount: number;
    order_items?: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    product_variant: {
        id: number;
        product: {
            id: number;
            name: string;
            price: number;
            image: string;
        };
        size?: {
            id: number;
            name: string;
        };
        color?: {
            id: number;
            color_name: string;
        };
    };
    quantity: number;
    price: number;
}
