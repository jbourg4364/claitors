import React, { useState, useRef } from 'react';
import './Nav.css';
import { NavLink, useNavigate } from 'react-router-dom';



const Nav = ({setSearchTerm, searchTerm}) => {
    const inputElement = useRef();
    const navigate = useNavigate();

    function handleSubmit (e) {
        e.preventDefault();
        navigate(`/books/search/${searchTerm}`);
    }

  return (
    <div id="nav">
      <div id="header">
        <h1 className="logo">Claitor's Law Books and Publishing Division</h1>
        <h3 className="logo-caption">Established in 1922</h3>
        <hr className="logo-line"></hr>
      </div>
      <div id="links">
        <NavLink to="/">
          <h3 className="nav-link">HOME</h3>
        </NavLink>
        <NavLink to="/gpotitles">
          <h3 className="nav-link">GPO TITLES</h3>
        </NavLink>
        <NavLink to="/claitorstitles">
          <h3 className="nav-link">CLAITOR'S TITLES</h3>
        </NavLink>
        <NavLink to="/lawbooks">
          <h3 className="nav-link">LAW BOOKS</h3>
        </NavLink>
        <NavLink to="/contact">
          <h3 className="nav-link" id="contact-us">
            CONTACT US
          </h3>
        </NavLink>
        <NavLink to="/cart">
          <i id="cart" className="fa-solid fa-cart-shopping fa-xl"></i>
        </NavLink>
      </div>
      <form id="input" ref={inputElement} onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Title, Author, ISBN, Series or Keyword"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i id="search-glass" className="fa-solid fa-magnifying-glass fa-xl"></i>
      </form>
    </div>
  );
};

export default Nav;