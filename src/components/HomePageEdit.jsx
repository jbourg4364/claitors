import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';

const HomePageEdit = ({ isAdmin, mainBannerImg, setMainBannerImg, mainBannerTitle, setMainBannerTitle, mainBannerDescription, setMainBannerDescription, mainBannerButton, setMainBannerButton }) => {
    const inputElement = useRef();
    let navigate = useNavigate();

    if (!isAdmin) {
        navigate('/login');
    };


  return (
    <div id='home-page-edit-container'>
        <h2 className='edit-title-banner'>Edit Home Page</h2>
        <div className='home-edit-container'>
            <h2>Main Banner</h2>
            <div className='home-edit-content-container'>
                <div className='home-banner-preview'>
                    Preview
                </div>
                <form ref={inputElement} className='home-edit-form'>
                    <input 
                    placeholder='Main Image URL'
                    type='url'
                    value={mainBannerImg}
                    className='home-edit-field'
                    onChange={(e) => setMainBannerImg(e.target.value)}
                    />
                    <input 
                    placeholder='Main Banner Title'
                    type='text'
                    value={mainBannerTitle}
                    className='home-edit-field'
                    onChange={(e) => setMainBannerTitle(e.target.value)}
                    />
                    <input 
                    placeholder='Main Banner Description'
                    type='text'
                    value={mainBannerDescription}
                    className='home-edit-field'
                    onChange={(e) => setMainBannerDescription(e.target.value)}
                    />
                    <input 
                    placeholder='Main Banner Button URL'
                    type='url'
                    value={mainBannerButton}
                    className='home-edit-field'
                    onChange={(e) => setMainBannerButton(e.target.value)}
                    />
                    <button className='home-button-save'>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
};

export default HomePageEdit