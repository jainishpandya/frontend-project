import React, { useState } from 'react';
import { Pagination as MUIPagination } from '@mui/material';

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
    const [page, setPage] = useState(1);
    const resultsPerPage = 10;

    const handleChange = (event, value) => {
        onPageChange(value);
    };

    const startRange = ((currentPage - 1) * resultsPerPage) + 1;
    const endRange = Math.min(currentPage * resultsPerPage, totalResults);

    return (
        <div className="flex justify-between items-center p-5 py-8 pb-9 rounded-br-[var(--br-radius)] bg-white h-fill">
            <div className="flex items-center space-x-2">
                <h1 className="font-semibold">
                    Showing {startRange}-{endRange} of {totalResults} Results
                </h1>
            </div>

            <MUIPagination
                count={Math.ceil(totalResults / resultsPerPage)}
                page={currentPage}
                onChange={handleChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'var(--color-br-blue-dark)',
                    },
                    '& .MuiPaginationItem-previousNext': {
                        backgroundColor: 'var(--color-br-gray-light)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        '&:hover': {
                            backgroundColor: 'var(--color-br-gray)',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'var(--color-br-blue-dark)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'var(--color-br-blue-dark)',
                        },
                    },
                }}
                shape="rounded"
            />
        </div>
    );
};

export default Pagination;
