import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function Form(props) {

    const { sendToParent } = props;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState();
    const [isValidEmail, setIsValid] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const navigate = useNavigate();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        setIsValid(isValidEmail);

        if (!email) {
            setError('');
            setShowError(false);
        } else if (!isValidEmail) {
            setError("Invalid email format");
            setShowError(true);
        } else {
            setError('');
            setShowError(false);
        }
    }

    useEffect(() => {
        validateEmail();
    }, [email])



    const submitHandler = async () => {

        if (!email) {
            setError("Email field is empty");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000)
            return;
        }

        if (!password) {
            setError("Password field is empty");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000)
            return;
        }

        try {

            axios.defaults.baseURL = await "http://localhost:3000/";
            const params = JSON.stringify({
                "email": email,
                "password": password,
            });

            const config = {
                headers: { 'content-type': 'application/json' }
            }

            const { data } = await axios.post("/api/v1/auth/login", params, config);

            console.log(data);

            if (data.userId && data.success) {
                sendToParent(data.userId)
                console.log(data);
            }
        } catch (error) {
            console.log("error: " + error);
            setError("Login failed. Please check your credentials.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000)
        }
    }

    const handleResetPassword = () => {
        navigate("/forgot-password")
    }

    return (
        <div className='flex flex-col justify-center px-28 w-full h-screen rounded-2xl bg-br-blue-light mt-4'>
            <p className='font-medium text-2xl text-br-blue-medium mt-4'>Welcome back!</p>
            <p className='font-medium text-md text-br-blue-medium pe-5'>Get access to the world of endless imagination.</p>
            {showError && (
                <div>
                    <Alert variant="outlined" severity="error">
                        {error}
                    </Alert>
                </div>
            )}
            <div className=''>
                <div>
                    <label className='text-md font-medium text-br-blue-medium'>Email</label>
                    <input
                        className='email w-full bg-white text-br-blue-medium rounded-xl px-4 py-3 mt-1 '
                        placeholder='Email'
                        type='Email'
                        value={email ?? ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className='text-red-500 text-xs'>{emailError}</p>
                </div>
                <div className='mt-4'>
                    <label className='text-md font-medium text-br-blue-medium'>Password</label>
                    <div className='flex bg-white rounded-xl '>
                        <input
                            className='w-full bg-white text-br-blue-medium rounded-xl px-4 py-3 mt-1'
                            placeholder='Password'
                            value={password ?? ""}
                            onChange={(e) => setPassword(e.target.value)}
                            type={show ? "text" : "password"}
                        />
                        <button className='p-4' onClick={handleClick}>
                            {show ? <BsEye /> : <BsEyeSlash />}
                        </button>
                    </div>
                    <p className='text-red-500 text-xs'>{passwordError}</p>
                </div>
                <div className='mt-4 flex flex-col gap-y-4'>
                    <button className='py-3 rounded-xl cursor-pointer bg-br-blue-medium text-white text-md font-bold' onClick={submitHandler}>
                        Sign In
                    </button>
                </div>
                <button className='text-md text-br-blue-medium font-semibold mt-4 cursor-pointer'
                    onClick={handleResetPassword}
                >Forgot Password? Reset Here</button>
            </div>

            {/* {showError && (
                <div
                    // style={{
                    //     position: "fixed",
                    //     top: "50%",
                    //     left: "50%",
                    //     transform: "translate(-50%, -50%)",
                    //     width: "30%",
                    //     zIndex: 1000,
                    // }}
                >
                    <Alert 
                        severity="error" 
                        className="h-30 justify-center shadow-2xl items-center"
                        sx={{
                            '& .MuiAlert-icon': {
                                fontSize: '4rem'
                            },
                            '& .MuiAlert-message': {
                                fontSize: '1.2rem'
                            },
                            '& .MuiAlert-action': {
                                alignItems: 'center'
                            },
                            borderRadius: '16px',
                            border: '1px solid #ef5350',
                            backgroundColor: '#FFF',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </div>
            )} */}
        </div>
    )
}

export default Form
