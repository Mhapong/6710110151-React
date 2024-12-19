import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import FinanceScreen from './pages/FinanceScreen';
import Register from './pages/SignupScreen';
import { Layout } from 'antd';
import { Link, Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import profile from './pages/Profile';
import Home from './pages/Home';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  return (

    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Home />
            }
          />

          <Route
            path='/login'
            element={isAuthenticated ? (
              <Navigate to="/FinanceScreen" />
            ) : (
              < LoginScreen onLoginSuccess={handleLoginSuccess} />
            )
            }
          />

          <Route
            path='/FinanceScreen'
            element={
              isAuthenticated ? (
                <FinanceScreen />
              ) : (
                <Navigate to='/' />
              )
            }
          />

          <Route
            path='/sign-up'
            element={
              <Register />
            } />

          <Route
            path='/profile'
            element={
              <profile />
            } />

        </Routes>
      </Router>
    </div>

  );
}

export default App;

