import React, { useEffect, useRef } from "react";
import "./Nav.css";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import Admin from "./Admin";
import Search from "./Search";

const Nav = ({ category, setCategory }) => {
  const inputElement = useRef();
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const location = useLocation();
  const defaultSearchTerm = searchTerm || "";
  

  

  function handleSubmit() {
    const newSearchTerm = inputElement.current.value;
    navigate(`/books/search/${newSearchTerm}`);
  };

  function setSelectCategory(term) {
    setCategory(term);
  };

  useEffect(() => {
    if (searchTerm && searchTerm !== defaultSearchTerm) {
      window.location.reload();
    }
  }, [searchTerm, defaultSearchTerm]);


  return (
    <>
    <div id="nav">
      <div id="header">
        <h1 className="logo">Claitor's Law Books and Publishing Division</h1>
        <h3 className="logo-caption">Established in 1922</h3>
        <hr className="logo-line"></hr>
      </div>

      {location.pathname !== "/login" && (
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
        <NavLink to="https://www.cartmanager.net/cgi-bin/cart.cgi">
          <i id="cart" className="fa-solid fa-cart-shopping fa-xl"></i>
        </NavLink>
      </div>
      )}
      {location.pathname !== "/login" && (
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
      )}
    </div>
    </>
    
  );
};

export default Nav;
