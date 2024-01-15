import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import { getAllContent } from "../api-client";
import { motion } from "framer-motion";
import Images from "../media";
import { Footer } from "./Index";
import "./Footer.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [mainBanner, setMainBanner] = useState([]);
  const [mainBannerTwo, setMainBannerTwo] = useState([]);
  const [mainBannerThree, setMainBannerThree] = useState([]);
  const [indContent, setIndContent] = useState([]);
  const [lawContent, setLawContent] = useState([]);
  const [GPOContent, setGPOContent] = useState([]);
  const [genealogyContent, setGenealogyContent] = useState([]);
  const [bannerRotation, setRotation] = useState(1);
  const [indContentRotation, setIndContentRotation] = useState(0);
  const [indContentRotationLaw, setIndContentRotationLaw] = useState(0);
  const [indContentRotationGPO, setIndContentRotationGPO] = useState(0);
  const [indContentRotationGenealogy, setIndContentRotationGenealogy] =
    useState(0);
  const [autoRotation, setAutoRotation] = useState(true);
  const [rotationIntervalId, setRotationIntervalId] = useState(null);
  const inputElement = useRef();
  const maxBooksToShow = 5;

  function handleSubmit(e) {
    e.preventDefault();
    window.alert(`You're subscribed!`);
    setEmail("");
  }

  const startAutoRotation = () => {
    if (autoRotation) {
      const intervalId = setInterval(newRotation, 6000);
      setRotationIntervalId(intervalId);
    }

    if (!autoRotation) {
      setRotationIntervalId(null);
      return () => {
        clearInterval(rotationIntervalId);
      };
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const response = await getAllContent();

      const indContentArray = response.filter(
        (cont) => cont.label === "home-ind"
      );
      const indContentArrayLaw = response.filter(
        (cont) => cont.label === "home-ind-law"
      );
      const indContentArrayGPO = response.filter(
        (cont) => cont.label === "home-ind-gpo"
      );
      const indContentArrayGenealogy = response.filter(
        (cont) => cont.label === "home-ind-genealogy"
      );
      setIndContent(indContentArray);
      setLawContent(indContentArrayLaw);
      setGPOContent(indContentArrayGPO);
      setGenealogyContent(indContentArrayGenealogy);

      response.forEach((cont) => {
        if (cont.label === "home-main-banner") {
          setMainBanner(cont);
        } else if (cont.label === "home-main-banner-two") {
          setMainBannerTwo(cont);
        } else if (cont.label === "home-main-banner-three") {
          setMainBannerThree(cont);
        }
      });
    };

    getContent();

    // Start auto rotation when the component mounts
    if (autoRotation) {
      startAutoRotation();
    }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(rotationIntervalId);
    };
  }, []);

  const newRotation = () => {
    setRotation((prevRotation) => (prevRotation % 3) + 1);
  };

  const toggleAutoRotation = () => {
    setAutoRotation(false);
    newRotation();
    clearInterval(rotationIntervalId);
  };

  const toggleAutoRotationLeft = () => {
    setAutoRotation(false);
    newRotationLeft();
    clearInterval(rotationIntervalId);
  };

  const newRotationLeft = () => {
    setRotation((prevRotation) => prevRotation - 1);
  };

  const carousel = (bannerRotation) => {
    if (bannerRotation === 1) {
      return mainBanner;
    } else if (bannerRotation === 2) {
      return mainBannerTwo;
    } else if (bannerRotation === 3) {
      return mainBannerThree;
    } else {
      return mainBanner;
    }
  };

  const rotateIndCarouselRight = () => {
    setIndContentRotation(
      (prevRotation) => (prevRotation + 1) % maxBooksToShow
    );
  };
  const rotateIndCarouselLeft = () => {
    setIndContentRotation(
      (prevRotation) => (prevRotation - 1 + maxBooksToShow) % maxBooksToShow
    );
  };
  const rotateIndCarouselRightLaw = () => {
    setIndContentRotationLaw(
      (prevRotation) => (prevRotation + 1) % maxBooksToShow
    );
  };
  const rotateIndCarouselLeftLaw = () => {
    setIndContentRotationLaw(
      (prevRotation) => (prevRotation - 1 + maxBooksToShow) % maxBooksToShow
    );
  };
  const rotateIndCarouselRightGPO = () => {
    setIndContentRotationGPO(
      (prevRotation) => (prevRotation + 1) % maxBooksToShow
    );
  };
  const rotateIndCarouselLeftGPO = () => {
    setIndContentRotationGPO(
      (prevRotation) => (prevRotation - 1 + maxBooksToShow) % maxBooksToShow
    );
  };
  const rotateIndCarouselRightGenealogy = () => {
    setIndContentRotationGenealogy(
      (prevRotation) => (prevRotation + 1) % maxBooksToShow
    );
  };
  const rotateIndCarouselLeftGenealogy = () => {
    setIndContentRotationGenealogy(
      (prevRotation) => (prevRotation - 1 + maxBooksToShow) % maxBooksToShow
    );
  };

  return (
    <>
      <div id="home-banner">
        <motion.div
          id="home-banner-content"
          initial={{ opacity: 0 }} // Set initial opacity to 0
          animate={{ opacity: 1 }} // Animate opacity to 1
          exit={{ opacity: 0 }} // Animate opacity to 0 when exiting
          key={bannerRotation}
          transition={{
            ease: "linear",
            duration: 1,
            x: { duration: 1 },
          }}
        >
          <div id="home-banner-left-arrow">
            <i
              className="fa-solid fa-chevron-left fa-2xl"
              id="left-arrow"
              onClick={toggleAutoRotationLeft}
            ></i>
          </div>
          <div id="home-banner-image">
            <img
              className="home-image-main"
              src={carousel(bannerRotation).imageurl}
            />
          </div>
          <div id="home-banner-title">
            <h3>{carousel(bannerRotation).title}</h3>
            <button
              className="home-button-main"
              onClick={() =>
                (window.location.href = carousel(bannerRotation).buttonurl)
              }
            >
              Order Now!
            </button>
          </div>
          <div id="home-banner-description">
            <p>{carousel(bannerRotation).description}</p>
          </div>
          <div id="home-banner-right-arrow">
            <i
              className="fa-solid fa-chevron-right fa-2xl"
              id="right-arrow"
              onClick={toggleAutoRotation}
            ></i>
          </div>
        </motion.div>
        <h1 id="featured-heading-start">FEATURED TITLES</h1>
        <div className="featured-container">
          {indContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-left-arrow">
              <i
                className="fa-solid fa-chevron-left fa-2xl"
                id="left-arrow-ind"
                onClick={rotateIndCarouselLeft}
              ></i>
            </div>
          )}

          {indContent.slice(0, maxBooksToShow).map((cont, index) => {
            const adjustedIndex =
              (index + indContentRotation) % indContent.length;
            const adjustedBook = indContent[adjustedIndex];

            if (adjustedBook.label === "home-ind") {
              return (
                <div className="featured-ind-container" key={adjustedBook.id}>
                  <h3 className="featured-ind-heading">{adjustedBook.title}</h3>
                  <img
                    src={adjustedBook.imageurl}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = Images.claitorsLogo;
                    }}
                  />
                  <button
                    className="featured-button"
                    onClick={() =>
                      (window.location.href = adjustedBook.buttonurl)
                    }
                  >
                    Order Now!
                  </button>
                </div>
              );
            }
          })}
          {indContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-right-arrow">
              <i
                className="fa-solid fa-chevron-right fa-2xl"
                id="right-arrow-ind"
                onClick={rotateIndCarouselRight}
              ></i>
            </div>
          )}
        </div>

        <h1 id="featured-heading">TOP LAW TITLES</h1>
        <div className="featured-container">
          {lawContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-left-arrow">
              <i
                className="fa-solid fa-chevron-left fa-2xl"
                id="left-arrow-ind"
                onClick={rotateIndCarouselLeftLaw}
              ></i>
            </div>
          )}

          {lawContent.slice(0, maxBooksToShow).map((cont, index) => {
            const adjustedIndex =
              (index + indContentRotationLaw) % lawContent.length;
            const adjustedBook = lawContent[adjustedIndex];

            if (adjustedBook.label === "home-ind-law") {
              return (
                <div className="featured-ind-container" key={adjustedBook.id}>
                  <h3 className="featured-ind-heading">{adjustedBook.title}</h3>
                  <img
                    src={adjustedBook.imageurl}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = Images.claitorsLogo;
                    }}
                  />
                  <button
                    className="featured-button"
                    onClick={() =>
                      (window.location.href = adjustedBook.buttonurl)
                    }
                  >
                    Order Now!
                  </button>
                </div>
              );
            }
          })}
          {lawContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-right-arrow">
              <i
                className="fa-solid fa-chevron-right fa-2xl"
                id="right-arrow-ind"
                onClick={rotateIndCarouselRightLaw}
              ></i>
            </div>
          )}
        </div>

        <h1 id="featured-heading">TOP GPO TITLES</h1>
        <div className="featured-container">
          {GPOContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-left-arrow">
              <i
                className="fa-solid fa-chevron-left fa-2xl"
                id="left-arrow-ind"
                onClick={rotateIndCarouselLeftGPO}
              ></i>
            </div>
          )}

          {GPOContent.slice(0, maxBooksToShow).map((cont, index) => {
            const adjustedIndex =
              (index + indContentRotationGPO) % GPOContent.length;
            const adjustedBook = GPOContent[adjustedIndex];

            if (adjustedBook.label === "home-ind-gpo") {
              return (
                <div className="featured-ind-container" key={adjustedBook.id}>
                  <h3 className="featured-ind-heading">{adjustedBook.title}</h3>
                  <img
                    src={adjustedBook.imageurl}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = Images.claitorsLogo;
                    }}
                  />
                  <button
                    className="featured-button"
                    onClick={() =>
                      (window.location.href = adjustedBook.buttonurl)
                    }
                  >
                    Order Now!
                  </button>
                </div>
              );
            }
          })}
          {GPOContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-right-arrow">
              <i
                className="fa-solid fa-chevron-right fa-2xl"
                id="right-arrow-ind"
                onClick={rotateIndCarouselRightGPO}
              ></i>
            </div>
          )}
        </div>

        <h1 id="featured-heading">TOP GENEALOGY TITLES</h1>
        <div className="featured-container">
          {genealogyContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-left-arrow">
              <i
                className="fa-solid fa-chevron-left fa-2xl"
                id="left-arrow-ind"
                onClick={rotateIndCarouselLeftGenealogy}
              ></i>
            </div>
          )}

          {genealogyContent.slice(0, maxBooksToShow).map((cont, index) => {
            const adjustedIndex =
              (index + indContentRotationGenealogy) % genealogyContent.length;
            const adjustedBook = genealogyContent[adjustedIndex];

            if (adjustedBook.label === "home-ind-genealogy") {
              return (
                <div className="featured-ind-container" key={adjustedBook.id}>
                  <h3 className="featured-ind-heading">{adjustedBook.title}</h3>
                  <img
                    src={adjustedBook.imageurl}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = Images.claitorsLogo;
                    }}
                  />
                  <button
                    className="featured-button"
                    onClick={() =>
                      (window.location.href = adjustedBook.buttonurl)
                    }
                  >
                    Order Now!
                  </button>
                </div>
              );
            }
          })}
          {genealogyContent.length < maxBooksToShow ? null : (
            <div id="ind-banner-right-arrow">
              <i
                className="fa-solid fa-chevron-right fa-2xl"
                id="right-arrow-ind"
                onClick={rotateIndCarouselRightGenealogy}
              ></i>
            </div>
          )}
        </div>
        <div id="newsletter">
          <h2 id="newsletter-heading">
            Join our mailing list for new titles, specials and more!
          </h2>
          <form
            method="post"
            action="https://claitors.com/cgi-bin/clt/subscribe.cgi"
            ref={inputElement}
            onSubmit={handleSubmit}
          >
            <input
              className="mailingList-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <button className="subscribe-button">Subscribe</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
