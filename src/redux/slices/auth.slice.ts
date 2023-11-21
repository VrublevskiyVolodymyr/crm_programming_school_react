import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ITokenPair, IUser, IErrorAuth} from '../../interfaces';
import {authService} from '../../services';



interface IState {
    error: IErrorAuth | null ;
    me: IUser | null;
}

const initialState: IState = {
    error: null,
    me: null
}

const login = createAsyncThunk<IUser, ITokenPair>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({message: 'An error occurred'} );
            }
        }
    }
)

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async () => {
        const {data} = await authService.me();
        return data
    }
)
const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.me = null;
            state.error = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isRejectedWithValue(login, me), (state, action) => {
                if (typeof action.payload === 'string') {
                    state.error = { error: action.payload, code: 401, details: null };
                } else {
                    state.error = action.payload as IErrorAuth;
                }
            })

});

const {actions, reducer: authReducer} = slice;

const authActions = {
    ...actions,
    login,
    me,
}

export {
    authReducer,
    authActions,
}