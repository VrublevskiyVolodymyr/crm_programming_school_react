import { AxiosResponse } from 'axios';

import { IRes } from '../types';
import { urls } from "../configs";
import { ITokenPair, ITokens, IUser } from "../interfaces";
import { axiosService } from "./axios.service";
import {AuthService} from "../types/authService.type";



const authService: AuthService = {

    login: async (cred: ITokenPair): Promise<IUser> => {
        try {
            const { data }: AxiosResponse<ITokens> = await axiosService.post(urls.auth.auth(), cred);
            authService.setTokens(data);
            const { data: user }: AxiosResponse<IUser> = await authService.me();
            return user;
        } catch (error) {
            throw new Error('Login failed');
        }
    },

    refresh: async (): Promise<void> => {
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists");
        }
        try {
            const { data }: AxiosResponse<ITokens> = await axiosService.post(urls.auth.refresh, {
                refresh: refreshToken,
            });
            authService.setTokens(data);
        } catch (error) {
            throw new Error('Refresh failed');
        }
    },

    me: (): IRes<IUser> => {
        return axiosService.get(urls.me);
    },

    getAccessToken: (): string | null => {
        return localStorage.getItem('access');
    },

    deleteTokens: (): void => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    },

    setTokens: ({ access, refresh }: ITokens): void => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem('refresh');
    },
};

export {authService};
