export interface IAddress {
    id: number;
    user_id: number;
    recipient_name: string;
    phone: string;
    address: string;
    note?: string; // Optional field, since it's not required
    createdAt?: Date; // Timestamps can be added if you need them
    updatedAt?: Date; // Same as above
  }
  

