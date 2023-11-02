import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { getAllContent } from "../api-client";

const Home = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState([]);
  const inputElement = useRef();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    window.alert(`You're subscribed!`);
    setEmail("");
  }

  useEffect(() => {
    const getContent = async () => {
      const response = await getAllContent();
      setContent(response);
    };
    getContent();
  }, []);


  return (
    <>
      <div id="home-banner">
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
      <div id="newsletter">
        <h2>Join our mailing list for new titles, specials and more!</h2>
        <form
          method="post"
          action="http://claitors.com/cgi-bin/clt/subscribe.cgi"
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
    </>
  );
};

export default Home;
