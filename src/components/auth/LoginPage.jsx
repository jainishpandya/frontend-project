import React, { useState, useEffect } from 'react';
import Form from './Form';
import VerificationForm from './VerificationForm';
import book1 from "../assets/book-1.png";
import book2 from "../assets/book-2.png";
import book3 from "../assets/book-3.png";
import loginAsset from "../assets/LoginScreenAsset.png";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) navigate("/home");
    }, [navigate]);

    const handleVerification = (param) => {
        setUserId(param);
    };

    return (
        <div className='flex items-center justify-center w-full h-screen p-4'>
            <div className='w-full h-screen flex flex-col items-center lg:w-1/2 bg-white py-4 px-2'>
                <div className='bg-lightblue items-center w-full py-6 px-4 text-2xl font-bold text-navyblue rounded-2xl' style={{ height: 'auto' }}>
                    BookCircle
                </div>
                {userId ? <VerificationForm userId={userId} /> : <Form sendToParent={handleVerification} />}
            </div>
            <div className='hidden lg:flex w-1/2 h-screen items-center justify-center bg-white py-4 px-2'>
                <div className='bg-lightblue flex items-center justify-center w-full h-full py-4 px-4 rounded-2xl'>
                    <img src={loginAsset} alt="Login Screen" style={{ height: 'auto', maxHeight: '500px' }} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
