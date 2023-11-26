import {IRes} from "../types";
import {axiosService} from "./axios.service";

import {urls} from "../configs";
import {IAccessToken} from "../interfaces/accessToken.interface";
import {IStatistic} from "../interfaces/statistic.interface";
import {IManagerPainted} from "../interfaces/managerPainted.interface";
import {IManager, IUser} from "../interfaces";

const adminService = {
    getAllManagers: (page: number, size: number): IRes<IManagerPainted> => axiosService.get(urls.admin.users, {params: {page, size}}),

    createManager: (data:IManager): IRes<IUser> => axiosService.post(urls.admin.users, data),

    reToken: (id: number): IRes<IAccessToken> => axiosService.get(urls.admin.re_token(id)),

    banManager: (id: number) => axiosService.patch(urls.admin.ban(id)),

    unbanManager: (id: number) => axiosService.patch(urls.admin.unban(id)),

    statisticAll: (): IRes<IStatistic> => axiosService.get(urls.admin.statisticAll),

    statisticByManagerId: (id:number ) => axiosService.get(urls.admin.statisticByManagerId(id))

}


export {adminService}