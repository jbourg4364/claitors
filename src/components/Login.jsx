import React, { useState, useRef } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../api-client';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const inputElement = useRef();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const data = await loginAdmin({ username: username, password: password, token: token });

  
          if (data.token) {
              localStorage.setItem("id", "admin");
              navigate('/admin/dashboard');
          } else {
              // Display error message in the UI or use a more user-friendly approach
              console.error('Login failed:', data.error);
              window.alert('Wrong username or password');
              
              // Clear only the password field, or adjust as per your UX design
              setPassword('');
          }
      } catch (error) {
          console.error('Unexpected error occurred:', error);
          // Handle unexpected errors, e.g., display a generic error message to the user
          window.alert('Unexpected error occurred. Please try again.');
      }
  };
  

  return (
    <div>
      <h2 id='login-heading'>Login to Continue</h2>
        <form ref={inputElement} onSubmit={handleSubmit} id='login-container'>
            <input 
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='login-input'
            />
            <input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-input'
            />
            <button type="submit" className='login-button'>Log in</button>
            <Link to='/' className='home-button-login'>Home</Link>
        </form>
    </div>
  )
}

export default Login