import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IComment, IOrder, IOrderPainted} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[],
    prev: string | null,
    next: string | null,
    total_pages: number | null,
    sortDirection: string,
    sortedColumn: string
}

const initialState: IState = {
    orders: [],
    prev: null,
    next: null,
    total_pages: null,
    sortDirection: "asc",
    sortedColumn: ""
};

const getAll = createAsyncThunk<IOrderPainted, { page: number, order: string }>(
    'orderSlice/getAll',
    async ({page, order}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page, order);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const createComment = createAsyncThunk<IComment, { comment: string, orderId: number }>(
    'carSlice/create',
    async ({comment, orderId}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.createComment(comment, orderId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const orderSlice = createSlice({
    name: "carSlice",
    initialState,
    reducers: {
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload.columnKey;
            state.sortDirection = action.payload.newSortDirection;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {items, prev, next, total_pages} = action.payload;
                state.orders = items;
                state.next = next;
                state.prev = prev;
                state.total_pages = total_pages;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const {orderId, manager} = action.payload;

                state.orders = state.orders.map((order) => {
                    if (order.id === orderId) {
                        const updatedOrder = {...order, comments: [...order.comments, action.payload]};

                        if (updatedOrder.status === null || updatedOrder.status === 'New') {
                            updatedOrder.status = 'In Work';
                        }
                        if(manager){
                            updatedOrder.manager = manager
                        }

                        return updatedOrder;
                    } else {
                        return order;
                    }
                });
            }),

});


const {reducer: orderReducer, actions: {setSortedColumn}} = orderSlice;

const orderActions = {
    getAll,
    createComment,
    setSortedColumn
}

export {orderReducer, orderActions}
