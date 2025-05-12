import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Databox from '../Databox';
import BasicLineChart from './LineChart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import WeeklyTopReads from './WeeklyTopReads';

function Dashboard() {
  const [error, setError] = useState(null);
  const [booksRead, setBooksRead] = useState(0);
  const [booksListed, setBooksListed] = useState(0);
  const [booksBorrowed, setBooksBorrowed] = useState(0);

  const clubId = useSelector((state) => state.club.id);
  const navigate = useNavigate();

  const dashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !clubId) {
        setError("Authentication credentials missing");
        return;
      }

      const api = axios.create({
        baseURL: process.env.REACT_APP_SERVERURL || 'http://localhost:3000'
      });

      const { data } = await api.get('api/v1/book/dashboardData', {
        params: {
          clubId,
          token
        }
      });
      // console.log(data);
      if (data.success) {
        setBooksRead(data.booksReadCount || 0);
        setBooksListed(data.booksListedCount || 0);
        setBooksBorrowed(data.booksBorrowedCount || 0);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError("Failed to fetch dashboard data. Please try again later.");
    }
  };

  useEffect(() => {
    dashboardData();
  }, [clubId]);

  return (
    <div className='w-full h-auto space-y-4'>
      <div className='flex w-full items-center justify-between space-x-4'>
        <div className="flex-1 cursor-pointer" onClick={() => navigate('/home/borrowed')}>
          <Databox number={booksRead} label="Books Read" />
        </div>
        <div className="flex-1 cursor-pointer" onClick={() => navigate('/home/mybooks')}>
          <Databox number={booksListed} label="Books Listed" />
        </div>
        <div className="flex-1 cursor-pointer" onClick={() => navigate('/home/borrowed')}>
          <Databox number={booksBorrowed} label="Books Borrowed" />
        </div>
      </div>
      <div className='flex space-x-4'>
        <div className='bg-white h-fit p-4 rounded-[var(--br-radius)] shadow w-1/2'>
          <BasicLineChart />
        </div>
        <div className='bg-white p-4 rounded-[var(--br-radius)] shadow w-1/2'>
          <WeeklyTopReads />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
