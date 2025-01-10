import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './components/Landingpage/LandingPage'
import Login from './components/Login/login'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on app load
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      // Clear user data on logout
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => handleLogin(false)} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/products" element={<div>Products Page</div>} />
          <Route path="/categories" element={<div>Categories Page</div>} />
          <Route path="/deals" element={<div>Deals Page</div>} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/account" element={<div>Account Page</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App