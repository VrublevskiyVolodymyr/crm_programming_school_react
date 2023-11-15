import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import qs, {ParsedQs} from 'qs';

import {Order} from "../Order/Order";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import {Pagination} from "../Pagination/Pagination";
import {IOrder} from "../../interfaces";
import {Loader2} from "../Loaders/Loader2/Loader2";
import {FilterComponent} from "../FilterComponent/FilterComponent";
import css from './orders.module.css'

interface IProps {
}

const Orders: FC<IProps> = () => {
    const {
        orders,
        isFilterVisible,
        total_pages,
        loading,
        queryFromFilter,

    } = useAppSelector((state) => state.orderReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;
    const orderBy = query.get('order') || "";

    const queryData = qs.parse(window.location.search, {ignoreQueryPrefix: true});
    const filterParams = ['status', 'group', 'course', 'courseFormat', 'courseType', 'name', 'surname', 'email', 'phone', 'age', 'startDate', 'endDate', 'my'];
    const isFilterQuery = filterParams.some(param => queryData[param]);
    const queryString = qs.stringify(queryData, {addQueryPrefix: true});

    const handlePageChange = (selectedPage: number) => {

        if (orderBy) {
            dispatch(orderActions.setQueryFromFilter(null))
            orderBy ? navigate(`/orders?page=${selectedPage}&order=${orderBy}`) : navigate(`/orders?page=${selectedPage}`);
        } else if (queryFromFilter !== null) {
            handleFilterChange(queryFromFilter);
            navigate(`/orders?page=${selectedPage}&${queryFromFilter}`)
        } else if (isFilterQuery) {
            handleFilterChange(queryString);
            navigate(`/orders?page=${selectedPage}&${queryString}`)
        }

    };

    const handleEditOrder = (orderId: number, editedOrderData: IOrder) => {
        dispatch(orderActions.update({id: orderId, order: editedOrderData}));
    };


    useEffect(() => {
        const delay = 30;

        const timer = setTimeout(() => {
            if (orderBy) {
                dispatch(orderActions.setShouldResetFilters(true));
                dispatch(orderActions.setQueryFromFilter(null));
                dispatch(orderActions.getAll({page: currentPage, order: orderBy}));
                dispatch(orderActions.setOrderBy(orderBy));
                dispatch(orderActions.setFilterVisible(false));
            } else if (queryFromFilter) {
                dispatch(orderActions.setOrderBy(null));
                filterChange(queryFromFilter);
                navigate(`/orders?page=${currentPage}&${queryFromFilter}`);
            } else {
                navigate(`/orders?page=${currentPage}&order=-id`);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [currentPage, orderBy, queryFromFilter, dispatch]);


    useEffect(() => {
        dispatch(orderActions.getGroups());
    }, [dispatch]);


    function filterChange(queryParams: string) {
        dispatch(orderActions.setOrderBy(null))
        const queryData = qs.parse(queryParams, {ignoreQueryPrefix: true});
        delete queryData.page;
        const queryDataToParams = Object.keys(queryData).map(key => `${key}=${queryData[key]}`).join('&');
        dispatch(orderActions.setQueryFromFilter(queryDataToParams));

        const page = currentPage;
        const status = queryData.status as string;
        const group = queryData.group as string;
        const course = queryData.course as string;
        const courseFormat = queryData.courseFormat as string;
        const courseType = queryData.courseType as string;
        const name = queryData.name as string;
        const surname = queryData.surname as string;
        const email = queryData.email as string;
        const phone = queryData.phone as string;
        const age = queryData.age as string;
        const startDate = queryData.startDate as string;
        const endDate = queryData.endDate as string;
        const my = queryData.my as string;

        dispatch(orderActions.getAll({
            page: page,
            status: status,
            group: group,
            course: course,
            courseFormat: courseFormat,
            courseType: courseType,
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            age: age,
            startDate: startDate,
            endDate: endDate,
            my: my
        }));
    }

    const handleFilterChange = (queryParams: string) => {
        filterChange(queryParams)
        navigate(`/orders?${queryParams}`)
    };

    const handleResetChange = () => {
        dispatch(orderActions.getAll({page: currentPage, order: '-id'}));
        navigate(`/orders?page=1&order=-id`);
        dispatch(orderActions.setQueryFromFilter(null))
    };


    function handleFilterExcel(queryParams: string) {
        const queryData = qs.parse(queryParams, {ignoreQueryPrefix: true});

        const status = queryData.status as string;
        const group = queryData.group as string;
        const course = queryData.course as string;
        const courseFormat = queryData.courseFormat as string;
        const courseType = queryData.courseType as string;
        const name = queryData.name as string;
        const surname = queryData.surname as string;
        const email = queryData.email as string;
        const phone = queryData.phone as string;
        const age = queryData.age as string;
        const startDate = queryData.startDate as string;
        const endDate = queryData.endDate as string;
        const my = queryData.my as string;

        dispatch(orderActions.exportToExcel({
            status: status,
            group: group,
            course: course,
            courseFormat: courseFormat,
            courseType: courseType,
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            age: age,
            startDate: startDate,
            endDate: endDate,
            my: my
        }));

    }

    return (
        <div className={css.container}>
            {isFilterVisible && <FilterComponent onFilter={handleFilterChange} onReset={handleResetChange}
                                                 onFilterExcel={handleFilterExcel}/>}
            <Order orders={orders} onEditOrder={handleEditOrder}/>
            {loading && <Loader2/>}
            <Pagination
                pageCount={total_pages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                isFirstPage={currentPage === 1}
                isLastPage={currentPage === total_pages}
            />

        </div>
    );
};

export {Orders};
