import React from 'react';
import Button from '../Button';

const ClubSortBy = ({ onClose }) => {
  const handleSeeResults = () => {
    onClose();
  };

  return (
    <div className=" p-5 px-8 bg-white rounded-[var(--br-radius)] space-y-3">
      <h1 className="text-xl font-bold">Sort By</h1>

      <hr className="border-t-2 border-br-gray-light" />

      {/* Club Name Sorting */}
      <div className="sort-section space-y-2">
        <p className="text-lg font-semibold">Club Name</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="nameAsc" name="sortName" value="asc" />
            <label htmlFor="nameAsc">A-Z</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="nameDesc" name="sortName" value="desc" />
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
            <input type="radio" id="membersHigh" name="sortMembers" value="highToLow" />
            <label htmlFor="membersHigh">Highest To Lowest</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="membersLow" name="sortMembers" value="lowToHigh" />
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
            <input type="radio" id="newest" name="sortDate" value="newest" />
            <label htmlFor="newest">Newest First</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="oldest" name="sortDate" value="oldest" />
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