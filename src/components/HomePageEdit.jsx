import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { getAllContent, editContent, deleteContent } from "../api-client";
import Images from "../media";

const HomePageEdit = ({ isAdmin }) => {
  const [content, setContent] = useState([]);
  const [mainBannerImg, setMainBannerImg] = useState("");
  const [mainBannerTitle, setMainBannerTitle] = useState("");
  const [mainBannerDescription, setMainBannerDescription] = useState("");
  const [mainBannerButton, setMainBannerButton] = useState("");
  const [mainBannerImgTwo, setMainBannerImgTwo] = useState("");
  const [mainBannerTitleTwo, setMainBannerTitleTwo] = useState("");
  const [mainBannerDescriptionTwo, setMainBannerDescriptionTwo] = useState("");
  const [mainBannerButtonTwo, setMainBannerButtonTwo] = useState("");
  const [mainBannerImgThree, setMainBannerImgThree] = useState("");
  const [mainBannerTitleThree, setMainBannerTitleThree] = useState("");
  const [mainBannerDescriptionThree, setMainBannerDescriptionThree] = useState("");
  const [mainBannerButtonThree, setMainBannerButtonThree] = useState("");
  

  const inputElement = useRef();
  let navigate = useNavigate();

  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  const tryEditContent = async (id) => {
    try {
      await editContent(
        id,
        mainBannerTitle,
        mainBannerDescription,
        mainBannerImg,
        mainBannerButton,
        "n/a"
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the main banner!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };

  const tryEditContentMainTwo = async (id) => {
    try {
      await editContent(
        id,
        mainBannerTitleTwo,
        mainBannerDescriptionTwo,
        mainBannerImgTwo,
        mainBannerButtonTwo,
        "n/a"
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the 2nd main banner!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };

  const tryEditContentMainThree = async (id) => {
    try {
      await editContent(
        id,
        mainBannerTitleThree,
        mainBannerDescriptionThree,
        mainBannerImgThree,
        mainBannerButtonThree,
        "n/a"
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the 3rd main banner!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };


  function handleMainSubmit(e) {
    e.preventDefault();
  }

  const handleDelete = async (book) => {
    await deleteContent(book.id);
    window.alert(`${book.title} removed from home page!`)
    const response = await getAllContent();
    setContent(response);
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
        <h2>Main Banner One</h2>
        <div className="home-edit-content-container-ind">
          <div className="home-banner-preview">
            <div id="featured-container-edit">
              {content.map((cont) => {
                if (cont.label === "home-main-banner") {
                  return (
                    <div className="featured-ind-container-edit" key={cont.id}>
                       <img src={cont.imageurl} className="featured-image-edit" onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}/>
                      <h3 className="featured-ind-heading-edit">{cont.title}</h3>
                    
                      <div id="edit-ind-home-container-buttons">
                        <button
                          className="featured-button-edit"
                          onClick={() =>
                            (window.location.href = cont.buttonurl)
                          }
                        >
                          Order Now!
                        </button>
                        <button
                          className="featured-button-edit"
                          id='trash-edit-admin'
                          onClick={() => handleDelete(cont)}
                        >
                          <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <h2>Featured Titles</h2>
        <div className="home-edit-content-container-ind">
          <div className="home-banner-preview">
            <div id="featured-container-edit">
              {content.map((cont) => {
                if (cont.label === "home-ind") {
                  return (
                    <div className="featured-ind-container-edit" key={cont.id}>
                       <img src={cont.imageurl} className="featured-image-edit" onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}/>
                      <h3 className="featured-ind-heading-edit">{cont.title}</h3>
                    
                      <div id="edit-ind-home-container-buttons">
                        <button
                          className="featured-button-edit"
                          onClick={() =>
                            (window.location.href = cont.buttonurl)
                          }
                        >
                          Order Now!
                        </button>
                        <button
                          className="featured-button-edit"
                          id='trash-edit-admin'
                          onClick={() => handleDelete(cont)}
                        >
                          <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <h2>Top Law Titles</h2>
        <div className="home-edit-content-container-ind">
          <div className="home-banner-preview">
            <div id="featured-container-edit">
              {content.map((cont) => {
                if (cont.label === "home-ind-law") {
                  return (
                    <div className="featured-ind-container-edit" key={cont.id}>
                       <img src={cont.imageurl} className="featured-image-edit" onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}/>
                      <h3 className="featured-ind-heading-edit">{cont.title}</h3>
                    
                      <div id="edit-ind-home-container-buttons">
                        <button
                          className="featured-button-edit"
                          onClick={() =>
                            (window.location.href = cont.buttonurl)
                          }
                        >
                          Order Now!
                        </button>
                        <button
                          className="featured-button-edit"
                          id='trash-edit-admin'
                          onClick={() => handleDelete(cont)}
                        >
                          <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>


        <h2>Top GPO Titles</h2>
        <div className="home-edit-content-container-ind">
          <div className="home-banner-preview">
            <div id="featured-container-edit">
              {content.map((cont) => {
                if (cont.label === "home-ind-gpo") {
                  return (
                    <div className="featured-ind-container-edit" key={cont.id}>
                       <img src={cont.imageurl} className="featured-image-edit" onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}/>
                      <h3 className="featured-ind-heading-edit">{cont.title}</h3>
                    
                      <div id="edit-ind-home-container-buttons">
                        <button
                          className="featured-button-edit"
                          onClick={() =>
                            (window.location.href = cont.buttonurl)
                          }
                        >
                          Order Now!
                        </button>
                        <button
                          className="featured-button-edit"
                          id='trash-edit-admin'
                          onClick={() => handleDelete(cont)}
                        >
                          <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>


        <h2>Top Genealogy Titles</h2>
        <div className="home-edit-content-container-ind">
          <div className="home-banner-preview">
            <div id="featured-container-edit">
              {content.map((cont) => {
                if (cont.label === "home-ind-genealogy") {
                  return (
                    <div className="featured-ind-container-edit" key={cont.id}>
                       <img src={cont.imageurl} className="featured-image-edit" onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}/>
                      <h3 className="featured-ind-heading-edit">{cont.title}</h3>
                    
                      <div id="edit-ind-home-container-buttons">
                        <button
                          className="featured-button-edit"
                          onClick={() =>
                            (window.location.href = cont.buttonurl)
                          }
                        >
                          Order Now!
                        </button>
                        <button
                          className="featured-button-edit"
                          id='trash-edit-admin'
                          onClick={() => handleDelete(cont)}
                        >
                          <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageEdit;
