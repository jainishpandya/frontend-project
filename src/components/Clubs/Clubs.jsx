import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, CircularProgress } from '@mui/material'
import { MdEdit } from 'react-icons/md'
import { TiDelete } from "react-icons/ti";
import { MdOutlineDone } from "react-icons/md";
import clubLogo from '../../assets/clubLogo.png'

const Clubs = ({ currentPage, onTotalResults, sortOptions, searchQuery, filters }) => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClubs = async () => {
        try {
            setLoading(true);

            const params = {
                page: currentPage,
            };

            if (searchQuery?.trim()) params.search = searchQuery.trim();
            if (sortOptions?.field && sortOptions.field !== 'club_name') {
                params.sortField = sortOptions.field;
            }
            if (sortOptions?.order && sortOptions.order !== 'ASC') {
                params.sortOrder = sortOptions.order;
            }
            if (filters?.status) params.status = filters.status;
            if (filters?.memberCount) params.memberCount = filters.memberCount;
            if (filters?.bookCount || filters?.bookCount === 0) params.bookCount = filters.bookCount;

            const queryParams = new URLSearchParams(params);
            const { data } = await axios.get(`http://localhost:3000/api/v1/club/listclub?${queryParams}`);

            if (data.success) {
                setClubs(data.listclub.rows || []);
                onTotalResults(data.listclub.count || 0);
            } else {
                setClubs([]);
                onTotalResults(0);
            }
        } catch (error) {
            console.error('Error fetching clubs:', error);
            setError('Failed to fetch clubs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, [currentPage, sortOptions, searchQuery, filters]);

    return (
        <Box className="p-0 w-full">
            <Box className="bg-white flex flex-row items-center justify-between py-3 px-6 text-sm font-semibold text-br-gray-dark mb-1 border-br-gray-light">
                <div className="w-1/12 pl-4">Logo</div>
                <div className="w-2/12">Club Name</div>
                <div className="w-2/12">Created On</div>
                <div className="w-2/12">Location</div>
                <div className="w-1/12 text-center">Status</div>
                <div className="w-2/12 text-center">Total Members</div>
                <div className="w-2/12 text-center">Actions</div>
            </Box>

            <div className='space-y-1'>
                {loading ? (
                    <Box className="p-4 text-center bg-white">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box className="p-4 text-center bg-white text-red-600">{error}</Box>
                ) : clubs.length === 0 ? (
                    <Box className="bg-white p-4 text-center">No clubs found.</Box>
                ) : (
                    clubs.map((club, index) => (
                        <Box
                            key={club.id || index}
                            className="bg-white flex cursor-pointer flex-row items-center py-4 px-4 text-sm hover:bg-gray-50 border-br-gray-light"
                        >
                            <div className="w-1/12 pl-3">
                                <img
                                    src={club.club_thumbnail_url || clubLogo}
                                    alt={`${club.club_name} logo`}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>

                            <div className="w-2/12 ">{club.club_name}</div>
                            <div className="w-2/12">
                                {new Date(club.createdAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </div>
                            <div className="w-2/12 ">{club.club_location}</div>


                            <div className="w-1/12 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs 
                                ${club.club_status
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"}`}
                                >
                                    {club.club_status ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="w-2/12 text-center">{club.total_members || 0}</div>

                            <div className="w-2/12 justify-center text-right flex space-x-2">
                                <button
                                    onClick={() => handleEdit(club)}
                                    className="cursor-pointer px-3 flex gap-1 p-2 bg-br-blue-dark text-white rounded-lg hover:bg-br-blue-medium transition-colors duration-200"
                                >
                                    <MdEdit size={20} />
                                    Edit Club
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(club)}
                                    className={`flex px-3 cursor-pointer text-white py-2 gap-1 rounded-lg transition-colors duration-200 
                                    ${club.club_status
                                            ? "bg-[var(--color-br-red-medium)] hover:bg-red-400"
                                            : "bg-[var(--color-br-green-medium)] hover:bg-green-400"}`}
                                >
                                    {club.club_status ? <TiDelete size={20} /> : <MdOutlineDone size={20} />}
                                    {club.club_status ? "Deactivate" : "Activate"}
                                </button>
                            </div>
                        </Box>
                    ))
                )}
            </div>
        </Box>
    )
}

export default Clubs