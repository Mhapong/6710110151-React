import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import FinanceScreen from './pages/FinanceScreen';
import Register from './pages/SignupScreen';
import { Layout } from 'antd';
import { Link, Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import profile from './pages/Profile';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  return (
    // <div>
    //   <body className="App-Header">
    //     <div className='login-container'>
    //       <div className='login'>
    //         {!isAuthenticated && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
    //         {isAuthenticated && <FinanceScreen />}
    //       </div>
    //     </div>
    //   </body>
    // </div>
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
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

