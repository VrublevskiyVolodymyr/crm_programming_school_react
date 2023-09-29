import {IOrderPainted} from "../interfaces";
import {urls} from "../configs";
import {axiosService} from "./axios.service";
import {IRes} from "../types";


const orderService = {
    getAll:(page: number , order: string ): IRes<IOrderPainted> => axiosService.get(urls.orders.orders,{params: {page, order}})

}
export {orderService}