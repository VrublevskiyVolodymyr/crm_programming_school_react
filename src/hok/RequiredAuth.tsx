import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {authService} from '../services';

interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {
    const accessToken = authService.getAccessToken();

    if (!accessToken) {
        console.log("<Navigate to={'/login'}")
        return <Navigate to={'/login'}/>
    }

    return children
};

export {RequiredAuth};