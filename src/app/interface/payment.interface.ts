export interface IPayment {
    id: number | string; 
    orderId: number | string;  
    codePayment: string;      
    statusPayment: string;     
    total_price: number;     
    paymentMethod: string;   
    paymentDate?: string;   
    transactionId?: string;     
    notes?: string;             
}
