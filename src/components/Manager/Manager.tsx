import {FC} from 'react';
import {IUser} from "../../interfaces";

import css from './manager.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux/slices/admin.slice";

interface IProps {
    manager: IUser
}

const Manager: FC<IProps> = ({manager}) => {
        const {id, name, surname, email, is_active, lastLogin} = manager;

        const {re_token} = useAppSelector(state => state.adminReducer)
        const statistic = useAppSelector((state) => state.adminReducer.statistics[id]);
        const dispatch = useAppDispatch();

        const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        }

        const handleRecoveryPassword = (id: number) => {
            dispatch(adminActions.getReToken({id}))
        };

        const handleBan = (id: number) => {
            dispatch(adminActions.banManager({id}));
        };

        const handleUnban = (id: number) => {
            dispatch(adminActions.unbanManager({id}));
        };

    return (
        <div className={css.container}>
            <div className={css.manager}>
                <div className={css.managerInfo}>
                    <div> id: {manager? id : null} </div>
                    <div> name: {manager? name : null} </div>
                    <div> surname: {manager? name : null} </div>
                    <div> email: {manager? email : null} </div>
                    <div> is_active: {is_active ? 'true' : 'false'} </div>
                    <div> lastLogin: {manager.lastLogin? formatDate(lastLogin.toString()) : null} </div>
                </div>

                <div className={css.managerStatistic}>
                    {statistic && (
                        <div className={css.statistic_statuses}>

                            <div className={css.statistic_status}>
                                Total : {statistic.total_count}
                            </div>

                            {statistic.statuses.map((status, index) => {
                                if(status.count!==0){
                                return (
                                    <div className={css.statistic_status} key={index}>
                                        {status.status} : {status.count}
                                    </div>
                                );}
                            })}

                        </div>
                    )}

                </div>

                <div className={css.managerButtons}>
                    <button onClick={() => handleRecoveryPassword(id)}>RECOVERY PASSWORD</button>
                    <button onClick={() => handleBan(id)}>BAN</button>
                    <button onClick={() => handleUnban(id)}>UNBAN</button>
                </div>

            </div>
        </div>
    );
};

export {Manager};