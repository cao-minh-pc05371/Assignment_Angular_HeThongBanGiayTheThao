import { IAddress } from "./adressess.interface.";

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    addresses: IAddress[]; // Mảng địa chỉ của người dùng
}