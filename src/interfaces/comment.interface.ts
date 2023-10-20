export interface IComment {
    id: number;
    comment: string;
    createdAt:string;
    orderId: number,
    manager: {
        id: number,
        name: string,
        surname: string,
        email: string
    }
}