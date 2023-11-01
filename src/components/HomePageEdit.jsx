import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';
import { getAllContent } from '../api-client';

const HomePageEdit = ({ isAdmin }) => {
  const [content, setContent] = useState([]);
  const [mainBannerImg, setMainBannerImg] = useState("");
  const [mainBannerTitle, setMainBannerTitle] = useState("");
  const [mainBannerDescription, setMainBannerDescription] = useState("");
  const [mainBannerButton, setMainBannerButton] = useState("");

  const inputElement = useRef();
  let navigate = useNavigate();

  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.alert("Your changes were saved!");
    navigate("/admin/dashboard");
  }

  useEffect(() => {
    const getContent = async () => {
      const response = await getAllContent();
      setContent(response);
    };
    getContent();
  }, []);



  return (
    <div id="home-page-edit-container">
      <h2 className="edit-title-banner">Edit Home Page</h2>
      <div className="home-edit-container">
        <h2>Main Banner</h2>
        <div className="home-edit-content-container">
          <div className="home-banner-preview">Preview</div>
                <form
                  ref={inputElement}
                  className="home-edit-form"
                  onSubmit={handleSubmit}
              
                >
                  <input
                    placeholder='Image URL'
                    type="url"
                    value={mainBannerImg}
                    className="home-edit-field"
                    onChange={(e) => setMainBannerImg(e.target.value)}
                  />
                  <input
                    placeholder='Title'
                    type="text"
                    value={mainBannerTitle}
                    className="home-edit-field"
                    onChange={(e) => setMainBannerTitle(e.target.value)}
                  />
                  <textarea
                    placeholder='Description'
                    type="text"
                    value={mainBannerDescription}
                    className="home-edit-field"
                    id="home-edit-field-description"
                    onChange={(e) => setMainBannerDescription(e.target.value)}
                  />
                  <input
                    placeholder='Button URL'
                    type="url"
                    value={mainBannerButton}
                    className="home-edit-field"
                    onChange={(e) => setMainBannerButton(e.target.value)}
                  />
                  <button className="home-button-save">Save</button>
                </form>
        </div>
      </div>
    </div>
  );
};

export default HomePageEdit;