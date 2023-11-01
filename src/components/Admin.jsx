import React from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';


const Admin = ({isAdmin}) => {
    let navigate = useNavigate();

    if (!isAdmin) {
        navigate('/login');
    };


  return (
    <div id='admin-dash-container'>
        <h2 className='edit-title-banner'>Welcome Back!</h2>
        <h3>Recently Added Titles</h3>
    </div>
  )
};

export default Admin;