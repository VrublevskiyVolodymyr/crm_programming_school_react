export interface IUser {
    id: number,
    name: string,
    surname: string,
    email:string,
    "is_active": boolean,
    "is_superuser": boolean,
    "is_staff": boolean,
    "createdAt": Date,
    "updatedAt": Date,
    "lastLogin": Date
}