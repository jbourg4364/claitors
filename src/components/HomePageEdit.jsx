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
        <div className="home-edit-content-container">
          <div className="home-banner-preview">
            {content.map((cont) => {
              if (cont.label === "home-main-banner") {
                return (
                  <div id="home-banner-content" key={cont.id}>
                    <div id="home-banner-image">
                      <img className="home-image-main" src={cont.imageurl} />
                    </div>
                    <div id="home-banner-title">
                      <h3>{cont.title}</h3>
                      <button
                        className="home-button-main"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                    <div id="home-banner-description">
                      <p>{cont.description}</p>
                    </div>
                  </div>
                );
              }
            })}
            <form
              ref={inputElement}
              className="home-edit-form"
              onSubmit={handleMainSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={mainBannerImg}
                className="home-edit-field"
                onChange={(e) => setMainBannerImg(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={mainBannerTitle}
                className="home-edit-field"
                onChange={(e) => setMainBannerTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                type="text"
                value={mainBannerDescription}
                className="home-edit-field"
                id="home-edit-field-description"
                onChange={(e) => setMainBannerDescription(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={mainBannerButton}
                className="home-edit-field"
                onChange={(e) => setMainBannerButton(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-main-banner") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContent(cont.id)}
                    >
                      {" "}
                      Save
                    </button>
                  );
                }
              })}
            </form>
          </div>
        </div>

        <h2>Main Banner Two</h2>
        <div className="home-edit-content-container">
          <div className="home-banner-preview">
            {content.map((cont) => {
              if (cont.label === "home-main-banner-two") {
                return (
                  <div id="home-banner-content" key={cont.id}>
                    <div id="home-banner-image">
                      <img className="home-image-main" src={cont.imageurl} />
                    </div>
                    <div id="home-banner-title">
                      <h3>{cont.title}</h3>
                      <button
                        className="home-button-main"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                    <div id="home-banner-description">
                      <p>{cont.description}</p>
                    </div>
                  </div>
                );
              }
            })}
            <form
              ref={inputElement}
              className="home-edit-form"
              onSubmit={handleMainSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={mainBannerImgTwo}
                className="home-edit-field"
                onChange={(e) => setMainBannerImgTwo(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={mainBannerTitleTwo}
                className="home-edit-field"
                onChange={(e) => setMainBannerTitleTwo(e.target.value)}
              />
              <textarea
                placeholder="Description"
                type="text"
                value={mainBannerDescriptionTwo}
                className="home-edit-field"
                id="home-edit-field-description"
                onChange={(e) => setMainBannerDescriptionTwo(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={mainBannerButtonTwo}
                className="home-edit-field"
                onChange={(e) => setMainBannerButtonTwo(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-main-banner-two") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContentMainTwo(cont.id)}
                    >
                      {" "}
                      Save
                    </button>
                  );
                }
              })}
            </form>
          </div>
        </div>

        <h2>Main Banner Three</h2>
        <div className="home-edit-content-container">
          <div className="home-banner-preview">
            {content.map((cont) => {
              if (cont.label === "home-main-banner-three") {
                return (
                  <div id="home-banner-content" key={cont.id}>
                    <div id="home-banner-image">
                      <img className="home-image-main" src={cont.imageurl} />
                    </div>
                    <div id="home-banner-title">
                      <h3>{cont.title}</h3>
                      <button
                        className="home-button-main"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                    <div id="home-banner-description">
                      <p>{cont.description}</p>
                    </div>
                  </div>
                );
              }
            })}
            <form
              ref={inputElement}
              className="home-edit-form"
              onSubmit={handleMainSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={mainBannerImgThree}
                className="home-edit-field"
                onChange={(e) => setMainBannerImgThree(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={mainBannerTitleThree}
                className="home-edit-field"
                onChange={(e) => setMainBannerTitleThree(e.target.value)}
              />
              <textarea
                placeholder="Description"
                type="text"
                value={mainBannerDescriptionThree}
                className="home-edit-field"
                id="home-edit-field-description"
                onChange={(e) => setMainBannerDescriptionThree(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={mainBannerButtonThree}
                className="home-edit-field"
                onChange={(e) => setMainBannerButtonThree(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-main-banner-three") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContentMainThree(cont.id)}
                    >
                      {" "}
                      Save
                    </button>
                  );
                }
              })}
            </form>
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
      </div>
    </div>
  );
};

export default HomePageEdit;
