import React, { useState } from 'react';
import { Pagination as MUIPagination } from '@mui/material';

const Pagination = () => {
    const [page, setPage] = useState(1);
    const totalResults = 39;
    const resultsPerPage = 10;

    const handleChange = (event, value) => {
        setPage(value);
        // Handle data fetch or pagination logic here
    };

    return (
        <div className="flex justify-between items-center p-5 py-8 rounded-br-[var(--br-radius)] bg-white h-fill">
            <div className="flex items-center space-x-2">
                <h1 className="font-semibold">
                    Showing {Math.min(resultsPerPage * page, totalResults)} of {totalResults} Results
                </h1>
            </div>

            <MUIPagination
                count={Math.ceil(totalResults / resultsPerPage)}
                page={page}
                onChange={handleChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'var(--color-br-blue-dark)',
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'var(--color-br-blue-dark)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'var(--color-br-blue-dark)',
                        },
                    },
                    '& .MuiPaginationItem-previousNext': {
                        backgroundColor: 'var(--color-br-gray-light)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        '&:hover': {
                            backgroundColor: 'var(--color-br-gray)',
                        },
                    },
                }}
                shape="rounded"
            />
        </div>
    );
};

export default Pagination;
