import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import FinanceScreen from './pages/FinanceScreen';
import Register from './pages/SignupScreen';
import { Layout } from 'antd';
import { Link, Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = () => {
    setSignedUp(true);
  }

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
                <Navigate to='/login' />
              )
            }
          />

          <Route
            path='/sign-up'
            element={signedUp ? (
              <Navigate to='/login' />
            ) : (
              <Register SignupSuccess={handleSignup} />
            )
            } />

          <Route
            path='/profile-page'
            element={
              <Profile />
            } />

        </Routes>
      </Router>
    </div>

  );
}

export default App;

