import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux/slices/admin.slice";
import {useNavigate, useSearchParams} from "react-router-dom";

import {Manager} from "../Manager/Manager";
import {IUser} from "../../interfaces";
import {Loader2} from "../Loaders/Loader2/Loader2";
import {Pagination} from "../Pagination/Pagination";
import css from "./managers.module.css"
import {ManagerFormModal} from "../ManagerFormModal/ManagerFormModal";

interface IProps {
}

const Managers: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {
        managers,
        loading,
        total_pages,
        statisticAll,
        isVisibleManagerModal
    } = useAppSelector(state => state.adminReducer)
    const navigate = useNavigate();

    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;

    useEffect(() => {
        dispatch(adminActions.getAllManagers({page: currentPage, size: 5}));
        dispatch(adminActions.getAllStatistic({}));
    }, [dispatch, currentPage]);


    useEffect(() => {
        if (managers.length > 0) {
            managers.forEach((manager: IUser) => {
                dispatch(adminActions.getStatisticByManagerId({id: manager.id}));
            });
        }
    }, [managers.length]);


    const handlePageChange = (selectedPage: number) => {
        navigate(`/adminPanel?page=${selectedPage}`)
    }

    const handleCreate = () => {
        dispatch(adminActions.setIsVisibleManagerModal(true));
    };


    return (
        <div className={css.container}>

            {isVisibleManagerModal && <ManagerFormModal/>}

            <div className={css.orders_statistic}>

                <div className={css.title_statistic}>ORDERS STATISTIC</div>

                {statisticAll && (
                    <div className={css.statistic_statuses}>

                        <div className={css.statistic_status}>
                            Total: <div> {statisticAll.total_count} </div>
                        </div>

                        {statisticAll.statuses.map((status, index) => {
                            return (
                                <div className={css.statistic_status} key={index}>
                                    {status.status}:
                                    <div> {status.count} </div>
                                </div>
                            );
                        })}


                    </div>
                )}

            </div>

            <button className={css.button_create} onClick={handleCreate}>CREATE</button>

            {managers.map((manager: IUser) => <Manager key={manager.id} manager={manager}/>)}
            {loading && <Loader2/>}
            {total_pages !== null && total_pages > 1 && (
                <Pagination
                    pageCount={total_pages || 1}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    isFirstPage={currentPage === 1}
                    isLastPage={currentPage === total_pages}
                />)}
        </div>
    );
};

export {Managers};
