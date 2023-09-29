import {IGroup} from "./group.interface";
import {IComment} from "./comment.interface";
import {IUser} from "./user.interface";

export interface IOrder {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: string;
    courseFormat: string;
    courseType: string;
    alreadyPaid: number;
    sum: number;
    msg: string;
    status: boolean;
    manager: IUser;
    created: string;
    utm: string;
    comments: IComment;
    group: IGroup;
}