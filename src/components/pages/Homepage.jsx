import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';


function Homepage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);



  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    console.log(userInfo)
    if (!userInfo){
    navigate("/");
    }
     
  }, [navigate]);

  return (
    <div className='w-full flex'>
      <Sidebar barstate={open} barstatechange={setOpen} />
      Homepage
    </div>
  )
}

export default Homepage
