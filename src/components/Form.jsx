import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BsEyeSlash, BsEye } from 'react-icons/bs';

function Form(props) {

    const { sendToParent } = props;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState();
    const [isValidEmail, setIsValid] = useState();
    const [password, setPassword] = useState();

    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        setIsValid(isValidEmail);

        if(!email) {
            setEmailError('');
        } else if(!isValidEmail) {
            setEmailError("Invalid email format");
        } else {
            setEmailError('');
        }
    }

    useEffect(() => {
      validateEmail();
    }, [email])
    


    const submitHandler = async () => {
        console.log("hellow");

        if (!email) {
            setEmailError("this field is empty");
            return;
        }

        if (!password) {
            setPasswordError("this field is empty");
            return;
        }

        try {
            console.log("function is called");

            axios.defaults.baseURL = await "http://localhost:3000/";
            const params = JSON.stringify({
                "email": email,
                "password": password,
            });

            const config = {
                headers: { 'content-type': 'application/json' }
            }

            const { data } = await axios.post("/user/signin", params, config);

            if (data.userId && data.success) {
                sendToParent(data.userId)
                console.log(data);
            }
        } catch (error) {
            console.log("error" + error);
        }
    }

    return (
        <div className='flex flex-col justify-center px-28 w-full h-screen rounded-2xl bg-lightblue mt-4'>
            <p className='font-medium text-2xl text-navyblue mt-4'>Welcome back!</p>
            <p className='font-medium text-md text-navyblue pe-5'>Get access to the world of endless imagination.</p>
            <div className='mt-4'>
                <div>
                    <label className='text-md font-medium text-navyblue'>Email</label>
                    <input
                        className='email w-full bg-white text-navyblue rounded-xl px-4 py-3 mt-1 '
                        placeholder='Email'
                        type='Email'
                        value={email ?? ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className='text-red-500 text-xs'>{emailError}</p>
                </div>
                <div className='mt-4'>
                    <label className='text-md font-medium text-navyblue'>Password</label>
                    <div className='flex bg-white rounded-xl'>
                        <input
                            className='w-full bg-white text-navyblue rounded-xl px-4 py-3 mt-1'
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
                    <button className='py-3 rounded-xl bg-navyblue text-white text-md font-bold' onClick={submitHandler}>
                        Sign In
                    </button>
                </div>
                <button className='text-md text-navyblue font-semibold mt-4'>Forgot Password? Reset Here</button>
            </div>
        </div>
    )
}

export default Form
