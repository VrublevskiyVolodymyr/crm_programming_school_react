import {FC, useEffect, useState} from 'react';
import { FaSignOutAlt, FaFilter} from 'react-icons/fa';
import {NavLink, useNavigate} from "react-router-dom";
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux/slices/auth.slice";
import css from './header.module.css'
import {orderActions} from "../../redux";

interface IProps {
}

const Header: FC<IProps>  = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [query,] = useSearchParams();
    const [isFilterVisible, setIsFilterVisible] = useState(false);



    const handleLogout = () => {
        authService.deleteTokens();
        dispatch(authActions.logout())
        navigate('/login')
    };

    useEffect(() => {
        const accessToken = authService.getAccessToken();

        if (!me && accessToken) {
            dispatch(authActions.me())
        }
    }, [me, dispatch])


    const toggleFilter = () => {
        const newFilterVisible = !isFilterVisible;
        setIsFilterVisible(newFilterVisible);
        dispatch(orderActions.setFilterVisible(newFilterVisible));
    }


    return (
        <div>
            {
                me && !query.get('expSession') ?
                    <div className={css.header}>

                        <div >Logo</div>

                        <div>
                            <span>{me.name}</span>

                            <button onClick={toggleFilter} className={css.faFilter} >
                                <FaFilter />
                            </button>

                        <button className={css.logout} onClick={handleLogout}> <FaSignOutAlt/></button>
                        </div>

                    </div>
                    :
                    <div>
                        <NavLink to={'login'}></NavLink>
                    </div>
            }
        </div>
    );
};

export {Header};