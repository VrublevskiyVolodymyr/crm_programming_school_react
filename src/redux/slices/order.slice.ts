import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IOrder, IOrderPainted} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[],
    updateOrder: IOrder | null,
    prev: string | null,
    next: string | null,
    total_pages: number | null,
    sortDirection: string,
    sortedColumn: string
}

const initialState: IState = {
    orders: [],
    updateOrder: null,
    prev: null,
    next: null,
    total_pages: null,
    sortDirection: "asc",
    sortedColumn: "-id"
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

const orderSlice = createSlice({
    name: "carSlice",
    initialState,
    reducers: {
        setSortedColumn: (state, action) => {
            const {columnKey, newSortDirection} = action.payload;
            state.sortedColumn = columnKey;
            state.sortDirection = newSortDirection;
        }
    },
    extraReducers: (builder) =>
        builder.addCase(getAll.fulfilled, (state, action) => {
            const {items, prev, next, total_pages} = action.payload;
            state.orders = items;
            state.next = next;
            state.prev = prev;
            state.total_pages = total_pages;
        }),
});


const {reducer: orderReducer, actions: {setSortedColumn}} = orderSlice;

const orderActions = {
    getAll,
    setSortedColumn
}

export {orderReducer, orderActions}
