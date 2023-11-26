import {FC, useEffect, useState} from 'react';
import { FaSignOutAlt, FaFilter, FaUserCog} from 'react-icons/fa';
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
    const [query, setQuery] = useSearchParams();
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const currentURL = window.location.href;
    const hasAdminPanel = currentURL.includes('adminPanel');
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

    const handleAdminPanel = () => {
      if(me?.is_superuser==true){
          navigate('/adminPanel')
      }
    }

    const handleLogo = () => {
        navigate('/orders')
    }

    return (
        <div>
            {
                me && !query.get('expSession') ?
                    <div className={css.header}>

                        <div className={css.logo} onClick={handleLogo}>Logo</div>

                        <div>
                            <span>{me.name}</span>

                            <button className={css.adminPanel} onClick={handleAdminPanel}> <FaUserCog/></button>
                            { !hasAdminPanel &&
                                ( <button onClick={toggleFilter} className={css.faFilter} >
                                <FaFilter />
                            </button>)
                            }

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