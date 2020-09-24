export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    cellphone?: string;
    password: string;
    token?: string;
    admin?: boolean;
}