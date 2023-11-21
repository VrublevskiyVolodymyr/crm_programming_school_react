
const baseURL = "http://localhost:8080/api/v1"

const admin = "/admin"
const auth = "/auth"
const groups = "/groups"
const orders = "/orders"
const users = "/users"
const excel = "/orders/excel"

const urls = {
    auth: {
        auth: () => auth,
        activate: (token: string):string => `${auth}/activate/${token}`,
        refresh:`${auth}/refresh`
    },
    admin: {
        users:`${admin}/users`,
        unban:(id:number):string =>`${admin}/users/${id}/unban`,
        ban:(id:number):string =>`${admin}/users/${id}/ban`,
        re_token: (id: number):string => `${admin}/users/${id}/re_token`,
        statisticAll:`${admin}/statistic/orders`,
        statisticByManagerId:(id:number): string => `${admin}/statistic/users/${id}`
    },
    groups: {
        groups: groups,
    },
    orders: {
        orders: orders,
        update:(id:number):string => `orders/${id}`,
        comments:(orderId:number):string => `orders/${orderId}/comments`,
        excel: excel
    },
    me:`${users}/me`
}

export {baseURL, urls}