import {FC, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {Order} from "../Order/Order";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import {Pagination} from "../Pagination/Pagination";
import {IOrder} from "../../interfaces";
import {Loader2} from "../Loaders/Loader2/Loader2";

interface IProps {
}

const Orders: FC<IProps> = () => {
    const {orders, total_pages, loading} = useAppSelector((state) => state.orderReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;
    const orderBy = query.get('order') || "-id";

    const handlePageChange = (selectedPage: number) => {
        orderBy ? navigate(`/orders?page=${selectedPage}&order=${orderBy}`) : navigate(`/orders?page=${selectedPage}`);
    };

    const handleEditOrder = (orderId: number, editedOrderData: IOrder) => {
        dispatch(orderActions.update({ id: orderId, order: editedOrderData }));
    };


    useEffect(() => {
        dispatch(orderActions.getAll({page: currentPage, order: orderBy}));
    }, [currentPage, orderBy, dispatch]);

    useEffect(() => {
        dispatch(orderActions.getGroups());
    }, [dispatch]);

    return (
        <div>
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
