import React, { useState, useEffect } from 'react';
import Button from '../Button';

const ClubFilters = ({ onClose, initialFilters }) => {
    const [filters, setFilters] = useState({
        status: Array.isArray(initialFilters?.status) ? initialFilters.status : [],
        memberCount: Array.isArray(initialFilters?.memberCount) ? initialFilters.memberCount : [],
        bookCount: Array.isArray(initialFilters?.bookCount) ? initialFilters.bookCount : []
      });      

    const toggleFilterValue = (filterKey, value) => {
        setFilters(prev => {
            const values = prev[filterKey];
            return {
                ...prev,
                [filterKey]: values.includes(value)
                    ? values.filter(v => v !== value)
                    : [...values, value]
            };
        });
    };

    useEffect(() => {
        setFilters({
          status: Array.isArray(initialFilters?.status) ? initialFilters.status : [],
          memberCount: Array.isArray(initialFilters?.memberCount) ? initialFilters.memberCount : [],
          bookCount: Array.isArray(initialFilters?.bookCount) ? initialFilters.bookCount : []
        });
      }, [initialFilters]);
      

    const handleSeeResults = () => {
        onClose(filters);
    };

    return (
        <div className="bg-white p-5 px-8 border-1 border-gray-200 rounded-[var(--br-radius)] space-y-3 z-10">
            <h1 className="text-xl font-bold">Filters</h1>
            <hr className="border-t-2 border-br-gray-light" />

            {/* Status Filter */}
            <div className="filter-section space-y-2">
                <h1 className="text-lg font-semibold">Status</h1>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="active"
                            checked={filters.status.includes('active')}
                            onChange={() => toggleFilterValue('status', 'active')} />
                        <label htmlFor="active">Active</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="inactive"
                            checked={filters.status.includes('inactive')}
                            onChange={() => toggleFilterValue('status', 'inactive')} />
                        <label htmlFor="inactive">Inactive</label>
                    </div>
                </div>
            </div>

            {/* Member Count Filter */}
            <hr className="border-t-2 border-br-gray-light" />
            <div className="filter-section space-y-2">
                <h1 className="text-lg font-semibold">Total Members</h1>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="small"
                            checked={filters.memberCount.includes('small')}
                            onChange={() => toggleFilterValue('memberCount', 'small')}
                        />
                        <label htmlFor="small">Small (1-10)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="medium"
                            checked={filters.memberCount.includes('medium')}
                            onChange={() => toggleFilterValue('memberCount', 'medium')}
                        />
                        <label htmlFor="medium">Medium (11-50)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="large"
                            checked={filters.memberCount.includes('large')}
                            onChange={() => toggleFilterValue('memberCount', 'large')}
                        />
                        <label htmlFor="large">Large (50+)</label>
                    </div>
                </div>
            </div>

            {/* Book Count Filter */}
            <hr className="border-t-2 border-br-gray-light" />
            <div className="filter-section space-y-2">
                <h1 className="text-lg font-semibold">Total Books</h1>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="zero"
                            checked={filters.bookCount.includes('zero')}
                            onChange={() => toggleFilterValue('bookCount', 'zero')}
                        />
                        <label htmlFor="zero">0 Books</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="hasBooks"
                            checked={filters.bookCount.includes('hasBooks')}
                            onChange={() => toggleFilterValue('bookCount', 'hasBooks')}
                        />
                        <label htmlFor="hasBooks">At least 1 Book</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="manyBooks"
                            checked={filters.bookCount.includes('manyBooks')}
                            onChange={() => toggleFilterValue('bookCount', 'manyBooks')}
                        />
                        <label htmlFor="manyBooks">More Than 50 Books</label>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSeeResults}
                className="bg-br-blue-medium text-white px-2 py-2 rounded-lg transition hover:bg-br-blue-dark w-full"
            >
                Apply Filters
            </Button>
        </div>
    );
};

export default ClubFilters;
