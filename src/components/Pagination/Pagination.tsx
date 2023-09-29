import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

import css from './pagination.module.css';

interface IProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
}

const Pagination: FC<IProps> = ({ pageCount, currentPage, onPageChange }) => {


    const handlePageClick = (data: { selected: number }) => {
        onPageChange(data.selected + 1);
    };
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;


    const previousLabel = isFirstPage ? null : (
        <div className={css.circle}>&lt;</div>
    );
    const nextLabel = isLastPage ? null : (
        <div className={css.circle}>&gt;</div>
    );



    return (
        <div className={css.pagination}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                initialPage={currentPage - 1}
                className={'pagination'}
                activeClassName={css.active}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export { Pagination };
