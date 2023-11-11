import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IComment, IGroup, IOrder, IOrderPainted} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[] ,
    prev: string | null ,
    next: string | null,
    total_pages: number | null,
    sortDirection: string,
    sortedColumn: string,
    groups:IGroup[],
    loading: boolean,
    isFilterVisible: boolean,
    queryFromFilter: string | null,
    orderBy: string | null,
    shouldResetFilters: boolean,
    excel: Blob | File | null;
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
    isFilterVisible: false,
    queryFromFilter: null,
    orderBy: null,
    shouldResetFilters: false,
    excel: null
};


const getAll = createAsyncThunk<IOrderPainted, { page?: number, order?: string, name?: string, surname?: string, email?: string,
    phone?: string, age?: string, course?: string, courseFormat?: string, courseType?: string, status?: string, group?: string, startDate?: string, endDate?: string,
    my?: string  }>(
    'orderSlice/getAll',
    async ({page, order,name,surname, email,phone, age,course,courseFormat,courseType,group,startDate,endDate,my, status}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page, order,name,surname, email,phone, age,course,courseFormat,courseType,status,group,startDate,endDate,my);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const exportToExcel = createAsyncThunk<IOrderPainted, { page?: number, order?: string, name?: string, surname?: string, email?: string,
    phone?: string, age?: string, course?: string, courseFormat?: string, courseType?: string, status?: string, group?: string, startDate?: string, endDate?: string,
    my?: string  }>(
    'orderSlice/exportToExcel',
    async ({page, order,name,surname, email,phone, age,course,courseFormat,courseType,group,startDate,endDate,my, status}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.exportToExcel(page, order,name,surname, email,phone, age,course,courseFormat,courseType,status,group,startDate,endDate,my);
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
        setFilterVisible: (state, action) => {
            state.isFilterVisible = action.payload;
        },
        setQueryFromFilter: (state, action) => {
            state.queryFromFilter = action.payload;
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
        },
        setShouldResetFilters: (state, action) => {
            state.shouldResetFilters = action.payload;
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
            .addCase(exportToExcel.fulfilled, (state, action) => {

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


const {reducer: orderReducer, actions: {setSortedColumn,setFilterVisible,setQueryFromFilter,setOrderBy, setShouldResetFilters}} = orderSlice;

const orderActions = {
    getAll,
    exportToExcel,
    createComment,
    update,
    getGroups,
    createGroup,
    setFilterVisible,
    setSortedColumn,
    setQueryFromFilter,
    setOrderBy,
    setShouldResetFilters


}

export {orderReducer, orderActions}
