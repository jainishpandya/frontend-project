import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';

function Homepage() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [activeOption, setActiveOption] = useState("Dashboard");
    
    const userdata = useSelector((state) => state.user);
  
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem('token'));
      
      console.log(token);
      
      if (!token) {
        navigate("/");
      }

      if(!userdata.isLoggedIn){
        navigate("/")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
  
    return (
      <div className='w-full h-fit flex'>
        <div>
          <Sidebar barstate={open} barstatechange={setOpen} activeOption={activeOption} setActiveOption={setActiveOption} />
        </div>
        <div className={'w-full bg-br-blue-light'}>
          <div className={'w-full h-fit p-4 color space-y-4'}>
            <Header setActiveOption={setActiveOption} />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
          <Footer />
      </div>
      </div>
    )
  }

export default Homepage
