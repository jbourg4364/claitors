import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { getAllContent, editContent } from "../api-client";

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
  const [oneBannerImg, setOneBannerImg] = useState("");
  const [oneBannerTitle, setOneBannerTitle] = useState("");
  const [oneBannerPrice, setOneBannerPrice] = useState("");
  const [oneBannerButton, setOneBannerButton] = useState("");
  const [twoBannerImg, setTwoBannerImg] = useState("");
  const [twoBannerTitle, setTwoBannerTitle] = useState("");
  const [twoBannerPrice, setTwoBannerPrice] = useState("");
  const [twoBannerButton, setTwoBannerButton] = useState("");
  const [threeBannerImg, setThreeBannerImg] = useState("");
  const [threeBannerTitle, setThreeBannerTitle] = useState("");
  const [threeBannerPrice, setThreeBannerPrice] = useState("");
  const [threeBannerButton, setThreeBannerButton] = useState("");

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

  const tryEditContentIndOne = async (id) => {
    try {
      await editContent(
        id,
        oneBannerTitle,
        "n/a",
        oneBannerImg,
        oneBannerButton,
        oneBannerPrice
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the featured section 1!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };

  const tryEditContentIndTwo = async (id) => {
    try {
      await editContent(
        id,
        twoBannerTitle,
        "n/a",
        twoBannerImg,
        twoBannerButton,
        twoBannerPrice
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the featured section 2!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };

  const tryEditContentIndThree = async (id) => {
    try {
      await editContent(
        id,
        threeBannerTitle,
        "n/a",
        threeBannerImg,
        threeBannerButton,
        threeBannerPrice
      );
      const response = await getAllContent();
      setContent(response);

      window.alert("Your changes were saved to the featured section 3!");
    } catch (error) {
      console.error(error, "Error editing content in React");
    }
  };

  function handleMainSubmit(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const getContent = async () => {
      const response = await getAllContent();
      setContent(response);
    };
    getContent();
  }, []);
  console.log(content);

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

        <h2>Sub Features</h2>
        <div className="home-edit-content-container">
          <div className="home-banner-preview">
            <div id="featured-container">
              {content.map((cont) => {
                if (cont.label === "home-ind-one") {
                  return (
                    <div className="featured-ind-container" key={cont.id}>
                      <h3 className="featured-ind-heading">{cont.title}</h3>
                      <img src={cont.imageurl} className="featured-image" />
                      <h4 className="price-field">{cont.price}</h4>
                      <button
                        className="featured-button"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                  );
                }
              })}

              {content.map((cont) => {
                if (cont.label === "home-ind-two") {
                  return (
                    <div className="featured-ind-container" key={cont.id}>
                      <h3 className="featured-ind-heading">{cont.title}</h3>
                      <img src={cont.imageurl} className="featured-image" />
                      <h4 className="price-field">{cont.price}</h4>
                      <button
                        className="featured-button"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                  );
                }
              })}
              {content.map((cont) => {
                if (cont.label === "home-ind-three") {
                  return (
                    <div className="featured-ind-container" key={cont.id}>
                      <h3 className="featured-ind-heading">{cont.title}</h3>
                      <img src={cont.imageurl} className="featured-image" />
                      <h4 className="price-field">{cont.price}</h4>
                      <button
                        className="featured-button"
                        onClick={() => (window.location.href = cont.buttonurl)}
                      >
                        Order Now!
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="home-edit-form-ind-container">
            <form
              ref={inputElement}
              className="home-edit-form-ind"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={oneBannerImg}
                className="home-edit-field-ind"
                onChange={(e) => setOneBannerImg(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={oneBannerTitle}
                className="home-edit-field-ind"
                onChange={(e) => setOneBannerTitle(e.target.value)}
              />
              <input
                placeholder="Price"
                type="text"
                value={oneBannerPrice}
                className="home-edit-field-ind"
                onChange={(e) => setOneBannerPrice(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={oneBannerButton}
                className="home-edit-field-ind"
                onChange={(e) => setOneBannerButton(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-ind-one") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContentIndOne(cont.id)}
                    >
                      {" "}
                      Save
                    </button>
                  );
                }
              })}
            </form>
            <form
              ref={inputElement}
              className="home-edit-form-ind"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={twoBannerImg}
                className="home-edit-field-ind"
                onChange={(e) => setTwoBannerImg(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={twoBannerTitle}
                className="home-edit-field-ind"
                onChange={(e) => setTwoBannerTitle(e.target.value)}
              />
              <input
                placeholder="Price"
                type="text"
                value={twoBannerPrice}
                className="home-edit-field-ind"
                onChange={(e) => setTwoBannerPrice(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={twoBannerButton}
                className="home-edit-field-ind"
                onChange={(e) => setTwoBannerButton(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-ind-two") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContentIndTwo(cont.id)}
                    >
                      {" "}
                      Save
                    </button>
                  );
                }
              })}
            </form>
            <form
              ref={inputElement}
              className="home-edit-form-ind"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Image URL"
                type="url"
                value={threeBannerImg}
                className="home-edit-field-ind"
                onChange={(e) => setThreeBannerImg(e.target.value)}
              />
              <input
                placeholder="Title"
                type="text"
                value={threeBannerTitle}
                className="home-edit-field-ind"
                onChange={(e) => setThreeBannerTitle(e.target.value)}
              />
              <input
                placeholder="Price"
                type="text"
                value={threeBannerPrice}
                className="home-edit-field-ind"
                onChange={(e) => setThreeBannerPrice(e.target.value)}
              />
              <input
                placeholder="Button URL"
                type="url"
                value={threeBannerButton}
                className="home-edit-field-ind"
                onChange={(e) => setThreeBannerButton(e.target.value)}
              />
              {content.map((cont) => {
                if (cont.label === "home-ind-three") {
                  return (
                    <button
                      key={cont.id}
                      className="home-button-save"
                      onClick={() => tryEditContentIndThree(cont.id)}
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
      </div>
    </div>
  );
};

export default HomePageEdit;
