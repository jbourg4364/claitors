import React, { useState, useRef } from "react";
import "./Nav.css";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import Admin from "./Admin";

const Nav = ({isAdmin}) => {
  const inputElement = useRef();
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const location = useLocation();
  const defaultSearchTerm = searchTerm || "";

  function handleSubmit(e) {
    e.preventDefault();
    const newSearchTerm = inputElement.current.value;
    navigate(`/books/search/${newSearchTerm}`);
  };

  function handleLogout() {
    localStorage.removeItem('id');
  }

  return (
    <>
    <div id="nav">
      <div id="header">
        <h1 className="logo">Claitor's Law Books and Publishing Division</h1>
        <h3 className="logo-caption">Established in 1922</h3>
        <hr className="logo-line"></hr>
      </div>
      {location.pathname !== "/login" && !isAdmin && (
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
      )}
      {isAdmin ? (
      <div id="links">
        <NavLink to="/admin/dashboard">
          <h3 className="nav-link">DASHBOARD</h3>
        </NavLink>
        <NavLink to="/admin/homePageEdit">
          <h3 className="nav-link">EDIT HOME PAGE</h3>
        </NavLink>
        <NavLink to="/gpotitles">
          <h3 className="nav-link">ADD A BOOK</h3>
        </NavLink>
        <NavLink to="/" onClick={handleLogout}>
          <h3 className="nav-link" id="contact-us">
            LOGOUT
          </h3>
        </NavLink>
      </div>
      ) : null}
      {location.pathname !== "/login" && (
        <form id="input" onSubmit={handleSubmit}>
          <input
            className="search-bar"
            placeholder="Title, Author, ISBN, Series or Keyword"
            defaultValue={defaultSearchTerm}
            ref={inputElement}
          />
          <i
            id="search-glass"
            className="fa-solid fa-magnifying-glass fa-xl"
            onClick={handleSubmit}
          ></i>
        </form>
      )}
    </div>
    </>
    
  );
};

export default Nav;
