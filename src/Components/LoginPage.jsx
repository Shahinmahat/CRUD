import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
// import VideoContainer from './VideoContainer';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Retrieve user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem('userData')) || [];
    const user = storedUsers.find(u => u.username === username && u.password === password);
    
    if(user){
      setShowSuccessPopup(true);
      handleLogin(username)
      navigate('/')
    
    }else{
      setShowSuccessPopup(false);
    }
  };

    const isFormValid = !errors.username && !errors.password;

  return (
    <div className="login-container">
    <div className='login-image'>
       <img src="images\Wavy_Gen-01_Single-07.jpg" alt='Login'/>
    </div>
    <div className='login-form'>
       {showSuccessPopup ? (
        <div className="success-popup">
          <p>Login successful! Welcome, {username}.</p>
        </div>
      ) : (
        <>
          <h2 className='title-login'>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <button type="submit" disabled={!isFormValid}>Login</button>
          </form>
          <p className='paragraph-login'>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </>
      )}
      {/* {showSuccessPopup && <VideoContainer />} */}
    </div>
    </div>
      
  );
};

export default LoginPage;