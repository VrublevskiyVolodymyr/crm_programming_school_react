import {IComment, IGroup, IOrder, IOrderPainted} from "../interfaces";
import {urls} from "../configs";
import {axiosService} from "./axios.service";
import {IRes} from "../types";


const orderService = {
    getAll:(page: number , order: string ): IRes<IOrderPainted> => axiosService.get(urls.orders.orders,{params: {page, order}}),

    updateById: (id:number, order: IOrder): IRes<IOrder> => axiosService.patch(urls.orders.update(id),order),

    createComment:(comment:string, orderId:number): IRes<IComment> => axiosService.post(urls.orders.comments(orderId), {comment: comment}),

    getAllComment:(orderId:number):IRes<IComment[]> => axiosService.get(urls.orders.comments(orderId)),

    getGroups:():IRes<IGroup[]> => axiosService.get(urls.groups.groups),


    createGroup:(name: string):IRes<IGroup> => axiosService.post(urls.groups.groups, {name:name}),


}
export {orderService}