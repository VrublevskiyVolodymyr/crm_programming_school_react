import {IComment, IOrderPainted} from "../interfaces";
import {urls} from "../configs";
import {axiosService} from "./axios.service";
import {IRes} from "../types";


const orderService = {
    getAll:(page: number , order: string ): IRes<IOrderPainted> => axiosService.get(urls.orders.orders,{params: {page, order}}),

    createComment:(comment:string, orderId:number): IRes<IComment> => axiosService.post(urls.orders.сomments(orderId), {comment: comment}),

    getAllComment:(orderId:number):IRes<IComment[]> => axiosService.get(urls.orders.сomments(orderId))
}
export {orderService}