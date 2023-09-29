import {ITokenPair, ITokens, IUser} from "../interfaces";
import {IRes} from "./axiosResp.type";

export type AuthService = {
    login: (cred: ITokenPair) => Promise<IUser>;
    refresh: () => Promise<void>;
    me: () => IRes<IUser>;
    getAccessToken: () => string | null;
    deleteTokens: () => void;
    setTokens: ({ access, refresh }: ITokens) => void;
    getRefreshToken: () => string | null;
};