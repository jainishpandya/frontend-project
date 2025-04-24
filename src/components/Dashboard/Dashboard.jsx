import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Homepage/Sidebar';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import Databox from '../Databox';
import BasicLineChart from './LineChart';

function Dashboard() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);


  return (
    <div className='w-full h-auto space-y-4'>
      <div className='flex w-full items-center justify-between space-x-4'>
        <div className="flex-1">
          <Databox number={7} label="Books Read" />
        </div>
        <div className="flex-1">
          <Databox number={10} label="Books Listed" />
        </div>
        <div className="flex-1">
          <Databox number={3} label="Books Borrowed" />
        </div>
      </div>
      <div className='bg-white p-4 rounded-[var(--br-radius)] shadow w-1/2'>
        <BasicLineChart />
      </div>
    </div>
  )
}

export default Dashboard
