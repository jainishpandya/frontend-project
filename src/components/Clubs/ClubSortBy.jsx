import React, { useEffect, useState } from 'react';
import Button from '../Button';

const ClubSortBy = ({ onClose, initialSort }) => {
  const [sortValue, setSortValue] = useState({
    field: initialSort?.field || 'club_name',
    order: initialSort?.order || 'ASC'
  });

  useEffect(() => {
    if (initialSort)
      setSortValue(initialSort);
  }, [initialSort])

  const handleSortChange = (field, order) => {
    setSortValue({ field, order });
  };

  const handleSeeResults = () => {
    onClose(sortValue);
  };

  return (
    <div className=" p-5 px-8 border-1 border-gray-200 bg-white rounded-[var(--br-radius)] space-y-3">
      <h1 className="text-xl font-bold">Sort By</h1>

      <hr className="border-t-2 border-br-gray-light" />

      {/* Club Name Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Club Name</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="nameAsc" name="sort"
              onChange={() => handleSortChange('club_name', 'ASC')}
              checked={sortValue.field === 'club_name' && sortValue.order === 'ASC'}
            />
            <label htmlFor="nameAsc">A-Z</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="nameDesc" name="sort"
              onChange={() => handleSortChange('club_name', 'DESC')}
              checked={sortValue.field === 'club_name' && sortValue.order === 'DESC'}
            />
            <label htmlFor="nameDesc">Z-A</label>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-br-gray-light" />

      {/* Member Count Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Members</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="membersHigh" name="sort"
              onChange={() => handleSortChange("total_members", 'DESC')}
              checked={sortValue.field === 'total_members' && sortValue.order === 'DESC'}
            />
            <label htmlFor="membersHigh">Highest To Lowest</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="membersLow" name="sort"
              onChange={() => handleSortChange('total_members', 'ASC')}
              checked={sortValue.field === 'total_members' && sortValue.order === 'ASC'} />
            <label htmlFor="membersLow">Lowest To Highest</label>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-br-gray-light" />

      {/* Creation Date Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Creation Date</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="newest" name="sort"
              onChange={() => handleSortChange('createdAt', 'DESC')}
              checked={sortValue.field === 'createdAt' && sortValue.order === 'DESC'}
            />
            <label htmlFor="newest">Newest First</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="oldest" name="sort"
              onChange={() => handleSortChange('createdAt', 'ASC')}
              checked={sortValue.field === 'createdAt' && sortValue.order === 'ASC'} />
            <label htmlFor="oldest">Oldest First</label>
          </div>
        </div>
      </div>

      <Button
        className="bg-br-blue-medium text-white px-2 py-2 rounded-lg transition hover:bg-br-blue-dark w-full"
        onClick={handleSeeResults}
      >
        See Results
      </Button>
    </div>
  );
};

export default ClubSortBy;