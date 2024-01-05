import React, { useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Nav.css";

const AdminNav = ({ category, setCategory }) => {
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

  function setSelectCategory(term) {
    setCategory(term);
    localStorage.setItem('category', term);
  };


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
          <NavLink to="/content">
            <h3 className="nav-link">EDIT HOME PAGE</h3>
          </NavLink>
          <NavLink to="/admin/addBook">
            <h3 className="nav-link">ADD NEW TITLE</h3>
          </NavLink>
          <NavLink to="/" onClick={handleLogout}>
            <h3 className="nav-link" id="contact-us">
              LOGOUT
            </h3>
          </NavLink>
        </div>
        <form id="input" onSubmit={handleSubmit}>
          <select id='select-search-input' onChange={(e) => setSelectCategory(e.target.value)} defaultValue={category}>
            <option value={''}>All</option>
            <option value={'title'}>Title</option>
            <option value={'author'}>Author</option>
            <option value={'publisher'}>Publisher</option>
            <option value={'isbn'}>ISBN</option>
          </select>
          <input
            className="search-bar"
            placeholder="Search Claitor's"
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
