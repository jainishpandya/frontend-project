import React from 'react'
import { motion } from "framer-motion"
import menu from "../assets/brand/menu.png"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className='py-4 px-8 border-b border-white/15 md:border-none bg-black '>
            <div className='container'>
                <div className='flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto'>
                    <div>
                        <div className='h-10 rounded-lg inline-flex justify-center items-center' >
                            <Link to='/'>
                            <div className='text-white font-medium text-2xl'>BookCircle</div>
                            </Link>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <nav className='flex gap-8 text-sm'>
                            <a href="" className='text-white/70  hover:text-white transition'>Features</a>
                            <a href="" className='text-white/70  hover:text-white transition'>Developers</a>
                            <a href="" className='text-white/70  hover:text-white transition'>Pricing</a>
                            <a href="" className='text-white/70  hover:text-white transition'>changelog</a>
                        </nav>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link to="/signin">
                            <button className='text-white relative border py-2 px-8 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]'>
                                <div className='absolute inset-0'>
                                    <div className='rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]'></div>
                                    <div className='rounded-lg border absolute inset-0 border-white/40 [mask-image: linear-gradient(to_top, black, transparent)]'></div>
                                    <div className='absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset] rounded-lg'></div>
                                </div>
                                <span>Sign In</span>
                            </button>
                        </Link>
                        <img src={menu} className='md:hidden ' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
