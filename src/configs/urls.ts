import {IComment} from "../interfaces";

const baseURL = "http://localhost:8080/api/v1"

const admin = "/admin"
const auth = "/auth"
const groups = "/groups"
const orders = "/orders"
const users = "/users"

const urls = {
    auth: {
        auth: () => auth,
        activate: (token: string):string => `${auth}/activate/${token}`,
        refresh:`${auth}/refresh`
    },
    admin: {
        users:`${admin}/users`,
        re_token: (id: number):string => `${admin}/users/${id}/re_token`
    },
    groups: {
        groups: groups,
    },
    orders: {
        orders: orders,
        updade:(id:number):string => `orders/${id}`,
        сomments:(orderId:number):string => `orders/${orderId}/comments`,
    },
    me:`${users}/me`

}

export {baseURL, urls}