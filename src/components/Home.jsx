import React from 'react';
import './Home.css';
import Images from "../media";


const Home = () => {
  return (
    <>
      <div id="home-banner">
        <div id="home-banner-content">
          <div id="home-banner-image">
            <img className="home-image-main" src={Images.homeMainBook} />
          </div>
          <div id="home-banner-title">
            <h3>
              NEW 21ST EDITION! $45.00(Save 10% when you order 10+ copies)
            </h3>
            <button className="home-button-main">Order Now!</button>
          </div>
          <div id="home-banner-description">
            <p>
              The Twenty-first edition of The Bluebook retains the same basic
              approach to legal citation established by its predecessors. The
              layout of The Bluebook has been updated to make the information
              easier to access. Some citation forms have been expanded,
              elaborated upon, or modified from previous editions to reflect the
              ever---expanding range of authorities used in legal writing and to
              respond to suggestions from the community.
            </p>
          </div>
        </div>
        <div id="featured-container">
          <div className="featured-ind-container">
            <h3 className="featured-ind-heading">
              Occupational Outlook Handbook
            </h3>
            <img src={Images.homeFeatBook1} className="featured-image" />
            <h4 className="price-field">
              Paperbound $25.00 | Hardcover $40.00
            </h4>
            <button className="featured-button">Order Now!</button>
          </div>
          <div className="featured-ind-container">
            <h3 className="featured-ind-heading">
              North American Industry Classification System
            </h3>
            <img src={Images.homeFeatBook2} className="featured-image" />
            <h4 className="price-field">
              Paperbound $55.00 | Hardcover $65.00
            </h4>
            <button className="featured-button">Order Now!</button>
          </div>
          <div className="featured-ind-container">
            <h3 className="featured-ind-heading">
              The United States Government Manual 2015
            </h3>
            <img src={Images.homeFeatBook3} className="featured-image" />
            <h4 className="price-field">Paperbound $35.00</h4>
            <button className="featured-button">Order Now!</button>
          </div>
        </div>
      </div>
      <div id="newsletter">
        <h2>Join our mailing list for new titles, specials and more!</h2>
        <input className='mailingList-input'/>
        <button className="subscribe-button">Subscribe</button>
      </div>
    </>
  );
};

export default Home;
