import {IComment, IGroup, IOrder, IOrderPainted} from "../interfaces";
import {urls} from "../configs";
import {axiosService} from "./axios.service";
import {IRes} from "../types";


const orderService = {
    getAll:( page?: number, order?: string, name?: string, surname?: string, email?: string,
             phone?: string, age?: string, course?: string, courseFormat?: string, courseType?: string, status?: string, group?: string, startDate?: string, endDate?: string,
             my?: string  ): IRes<IOrderPainted> => axiosService.get(urls.orders.orders,{params: {page, order,status,name,surname, email,phone, age,course,courseFormat,courseType,group,startDate,endDate,my}}),

    exportToExcel:( page?: number, order?: string, name?: string, surname?: string, email?: string,
                    phone?: string, age?: string, course?: string, courseFormat?: string, courseType?: string, status?: string, group?: string, startDate?: string, endDate?: string,
                    my?: string  ): IRes<IOrderPainted> => axiosService.get(urls.orders.excel,{params: {page, order,status,name,surname, email,phone, age,course,courseFormat,courseType,group,startDate,endDate,my}}),

    updateById: (id:number, order: IOrder): IRes<IOrder> => axiosService.patch(urls.orders.update(id),order),

    createComment:(comment:string, orderId:number): IRes<IComment> => axiosService.post(urls.orders.comments(orderId), {comment: comment}),

    getGroups:():IRes<IGroup[]> => axiosService.get(urls.groups.groups),


    createGroup:(name: string):IRes<IGroup> => axiosService.post(urls.groups.groups, {name:name}),


}
export {orderService}