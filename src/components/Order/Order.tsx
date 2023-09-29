import React, { FC, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { IOrder } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { orderActions } from "../../redux";
import css from './order.module.css';

interface IProps {
    orders: IOrder[];
}

const Order: FC<IProps> = ({ orders }) => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const { sortedColumn, sortDirection } = useAppSelector((state) => state.orderReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHeaderClick = (columnKey: string) => {
        const newSortDirection =
            sortedColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
        const sortOrder = newSortDirection === "asc" ? "" : "-";
        const orderBy = `${sortOrder}${columnKey}`;

        dispatch(orderActions.setSortedColumn({ columnKey, newSortDirection }));
        navigate(`/orders/?page=1&order=${orderBy}`);
    };

    const toggleRow = (rowId: number) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter((id) => id !== rowId));
        } else {
            setExpandedRows([...expandedRows, rowId]);
        }
    };

    return (
        <div>
            <table className={css.table}>
                <thead>
                <tr className={css.tr}>
                    <th className={css.th} onClick={() => onHeaderClick('id')}>id</th>
                    <th onClick={() => onHeaderClick('name')}>name</th>
                    <th onClick={() => onHeaderClick('surname')}>surname</th>
                    <th onClick={() => onHeaderClick('email')}>email</th>
                    <th onClick={() => onHeaderClick('phone')}>phone</th>
                    <th onClick={() => onHeaderClick('age')}>age</th>
                    <th onClick={() => onHeaderClick('course')}>course</th>
                    <th onClick={() => onHeaderClick('courseFormat')}>course_format</th>
                    <th onClick={() => onHeaderClick('courseType')}>course_type</th>
                    <th onClick={() => onHeaderClick('status')}>status</th>
                    <th onClick={() => onHeaderClick('sum')}>sum</th>
                    <th onClick={() => onHeaderClick('alreadyPaid')}>already_paid</th>
                    <th onClick={() => onHeaderClick('group')}>group</th>
                    <th onClick={() => onHeaderClick('created')}>created_at</th>
                    <th onClick={() => onHeaderClick('manager')}>manager</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <React.Fragment key={order.id}>
                        <tr onClick={() => toggleRow(order.id)}>
                            <td>{order.id || 'null'}</td>
                            <td>{order.name || 'null'}</td>
                            <td>{order.surname || 'null'}</td>
                            <td>{order.email || 'null'}</td>
                            <td>{order.phone || 'null'}</td>
                            <td>{order.age || 'null'}</td>
                            <td>{order.course || 'null'}</td>
                            <td>{order.courseFormat || 'null'}</td>
                            <td>{order.courseType || 'null'}</td>
                            <td>{order.status || 'null'}</td>
                            <td>{order.sum || 'null'}</td>
                            <td>{order.alreadyPaid || 'null'}</td>
                            <td>{order.group ? (order.group.name || 'null') : 'null'}</td>
                            <td>{order.created || 'null'}</td>
                            <td>{order.manager ? (order.manager.name || 'null') : 'null'}</td>
                        </tr>
                        {expandedRows.includes(order.id) && (
                            <tr>
                                <td colSpan={14}>
                                    <div>
                                        <p>UTM: {order.utm || 'null'}</p>
                                        <p>Message: {order.msg || 'null'}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export { Order };
