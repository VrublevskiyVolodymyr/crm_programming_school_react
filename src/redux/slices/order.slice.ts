import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IComment, IGroup, IOrder, IOrderPainted} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[] ,
    prev: string | null,
    next: string | null,
    total_pages: number | null,
    sortDirection: string,
    sortedColumn: string,
    groups:IGroup[],
    loading: boolean
}

const initialState: IState = {
    orders: [],
    prev: null,
    next: null,
    total_pages: null,
    sortDirection: "asc",
    sortedColumn: "",
    groups:[],
    loading: true,
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

const update = createAsyncThunk<IOrder, { order: IOrder, id: number }>(
    'orderSlice/update',
    async ({id, order}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.updateById(id, order)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const createComment = createAsyncThunk<IComment, { comment: string, orderId: number }>(
    'orderSlice/createComment',
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

const getGroups = createAsyncThunk<IGroup[]>(
    'orderSlice/getGroups',
    async ( _, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getGroups();
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const createGroup = createAsyncThunk<IGroup, { name: string }>(
    'orderSlice/createGroup',
    async ({name}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.createGroup(name);
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
                state.loading = false
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const {orderId, manager} = action.payload;
                state.loading = false
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
            })
            .addCase(update.fulfilled, (state, action) => {
                const { id, ...updatedOrder } = action.payload;
                state.loading = false
                state.orders = state.orders.map((order) => {
                    if (order.id === id) {
                        const updated = { ...order, ...updatedOrder };

                        return updated;
                    }
                    return order;
                });
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.loading = false
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = [...state.groups, action.payload];
            })
            .addDefaultCase((state, actions) => {
                const [actionStatus] = actions.type.split('/').slice(-1);
                state.loading = actionStatus === 'pending';
            })

});


const {reducer: orderReducer, actions: {setSortedColumn}} = orderSlice;

const orderActions = {
    getAll,
    createComment,
    update,
    getGroups,
    createGroup,
    setSortedColumn
}

export {orderReducer, orderActions}
