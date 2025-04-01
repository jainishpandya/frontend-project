import { useState } from 'react'
import LoginPage from './components/auth/LoginPage'
import LandingPage from './components/pages/LandingPage'
import Navbar from './components/layout/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import Homepage from './components/pages/Homepage'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' Component={LandingPage} />
        <Route path='/signin' Component={LoginPage} />
        <Route path='/home' Component={Homepage} />
      </Routes>
    </>
  )
}

export default App
