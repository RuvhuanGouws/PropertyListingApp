export interface Advert
{
    id?: number;
    header?: string;
    province?: string;
    city?: string;
    details?: string;
    price?: number;
    userID?: number;
    status?: string;
    featured: boolean;
}