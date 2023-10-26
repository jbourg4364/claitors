import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook } from './Index';
import './Main.css';


const Main = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route 
      path='/'
      element={<Home />}
      />
      <Route 
      path='/lawbooks'
      element={<LawBooks />}
      />
      <Route 
      path='/books/details/:id'
      element={<IndBook />}
      />
    </Routes>
    </>
  )
};

export default Main;