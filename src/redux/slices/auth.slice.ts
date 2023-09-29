import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ITokenPair, IError, IUser} from '../../interfaces';
import {authService} from '../../services';

interface IState {
    error: IError | null;
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
            const err = e as AxiosError
            if (err.response) {
                return rejectWithValue(err.response.data);
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
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IError
            })
});

const {actions, reducer: authReducer} = slice;

const authActions = {
    ...actions,
    login,
    me
}

export {
    authReducer,
    authActions
}