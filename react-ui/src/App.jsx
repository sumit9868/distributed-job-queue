import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import JobForm from "./Components/JobForm";
import JobStatus from "./Components/JobStatus";
import JobDashboard from "./Components/JobDashboard";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import LandingPage from "./Components/LandingPage";
import './App.css';
import './style/JobDashboard.css';

function App() {
  // Initialize from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Sync to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link> | 
            <Link to="/submit">Submit Job</Link> | 
            <Link to="/status">Check Status</Link> |
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={isLoggedIn ? <JobDashboard /> : <Navigate to="/login" />} />
        <Route path="/submit" element={isLoggedIn ? <JobForm /> : <Navigate to="/login" />} />
        <Route path="/status" element={isLoggedIn ? <JobStatus /> : <Navigate to="/login" />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;