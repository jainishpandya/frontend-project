import { useState } from 'react'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' Component={LandingPage} />
        <Route path='signin' Component={LoginPage} />
        <Route path='dashboard' Component={Dashboard} />
      </Routes>
    </>
  )
}

export default App
