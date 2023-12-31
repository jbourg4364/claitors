import React from 'react';
import './Footer.css';

const Footer = () => {

  return (
    <div id="footer-container">
      <h1 className="logo">Claitor's Law Books and Publishing Division</h1>
      <h3 className="logo-caption">Established in 1922</h3>
      <hr className="logo-line"></hr>
      <div id='footer-lower-container'>
        <h3>PO Box 261333, Baton Rouge, LA 70826-1333</h3>
        <h3 type='tel' >800-274-1403  |  225-344-0476</h3>
        <h3>Fax: 225-344-0480</h3>
        <br />
        <p>©️ Claitor's</p>
      </div>
    </div>
  );
};

export default Footer;