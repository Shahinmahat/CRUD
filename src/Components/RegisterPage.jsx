import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = ({ handleRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showRegisterSuccessPopup, setShowRegisterSuccessPopup] = useState(false);
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleRegister(formData);
      setShowRegisterSuccessPopup(true);
      return <Navigate to = "/login"/>
    }
  };

  return (
    <div className="register-container">
    <div className='register-image'>
      <img src='images\cuate.png' alt='Register'/>
    </div>
      <div className='register-form'>
      {showRegisterSuccessPopup ? (
        <div className='success-message'>
            <p>Your account has been successfully registered</p>
            <p>Please <Link to="/login">login here</Link>.</p>
        </div>
      ):(
        <>
        <h2 className='title-register'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <p className='para-register'>Already have an account? <Link to="/login">Login here</Link></p>
      </>
      )}
     
      </div>
      
    </div>
  );
};

export default RegisterPage;

