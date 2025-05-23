import React, { useState } from 'react';
import Button from './Button';

const SortBy = ({ onClose, initialSort }) => {
  const [sortValue, setSortValue] = useState({
    field: initialSort?.field || 'title',
    order: initialSort?.order || 'ASC'
  });

  const handleSortChange = (field, order) => {
    setSortValue({ field, order });
  };

  const handleSeeResults = () => {
    onClose(sortValue);
  };
  return (
    <div className="w-49 p-5 px-8 bg-white rounded-[var(--br-radius)] space-y-3">
      <h1 className="text-xl font-bold">Sort By</h1>

      <hr class="border-t-2 border-br-gray-light" />

      {/* Title Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Title</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="titleAsc"
              name="sort"
              onChange={() => handleSortChange('title', 'ASC')}
              checked={sortValue.field === 'title' && sortValue.order === 'ASC'}
            />
            <label htmlFor="titleAsc">A-Z</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="titleDesc"
              name="sort"
              onChange={() => handleSortChange('title', 'DESC')}
              checked={sortValue.field === 'title' && sortValue.order === 'DESC'}
            />
            <label htmlFor="titleDesc" >Z-A</label>
          </div>
        </div>
      </div>

      <hr class="border-t-2 border-br-gray-light" />

      {/* Book Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold ">Book</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="recentlyAdded"
              name="sort"
              onChange={() => handleSortChange('createdAt', 'DESC')}
              checked={sortValue.field === 'createdAt' && sortValue.order === 'DESC'}
            />
            <label htmlFor="recentlyAdded">Recently Added</label>
          </div>
          {/* <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="recentlyAdded"
              name="sort"
              onChange={() => handleSortChange('createdAt', 'DESC')}
              checked={sortValue.field === 'createdAt' && sortValue.order === 'DESC'}
            />
            <label htmlFor="mostRead">Most Read</label>
          </div> */}
        </div>
      </div>

      {/* <hr class="border-t-2 border-br-gray-light" /> */}

      {/* Book Rating Sorting */}
      {/* <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Book Rating</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="fiveStar" name="sortRating" value="fiveStar" />
            <label htmlFor="fiveStar">5 Star</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="fourStar" name="sortRating" value="fourStar" />
            <label htmlFor="fourStar">&gt; 4 Star</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="threeStar" name="sortRating" value="threeStar" />
            <label htmlFor="threeStar">&gt; 3 Star</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="twoStar" name="sortRating" value="twoStar" />
            <label htmlFor="twoStar">&gt; 2 Star</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="oneStar" name="sortRating" value="oneStar" />
            <label htmlFor="oneStar">&gt; 1 Star</label>
          </div>
        </div>
      </div> */}

      <Button className="bg-br-blue-medium text-white px-2 py-2 rounded-lg transition hover:bg-br-blue-dark w-full"
        onClick={handleSeeResults}>
        See Results
      </Button>
    </div>
  );
};

export default SortBy;