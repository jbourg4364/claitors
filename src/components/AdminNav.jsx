import React, { useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Nav.css";

const AdminNav = () => {
  function handleLogout() {
    localStorage.removeItem("id");
  }

  const inputElement = useRef();
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const defaultSearchTerm = searchTerm || "";

  function handleSubmit(e) {
    e.preventDefault();
    const newSearchTerm = inputElement.current.value;
    navigate(`/books/search/${newSearchTerm}`);
  }

  return (
    <>
      <div id="nav">
        <div id="header">
          <h1 className="logo">Claitor's Law Books and Publishing Division</h1>
          <h3 className="logo-caption">Established in 1922</h3>
          <hr className="logo-line"></hr>
        </div>
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
      </div>
    </>
  );
};

export default AdminNav;
