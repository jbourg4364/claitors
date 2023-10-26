import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook, Footer } from './Index';
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
      exact path='/lawbooks'
      element={<LawBooks />}
      />
      <Route 
      path='/books/details/:id'
      element={<IndBook />} /> 
    </Routes>
    <Footer />
    </>
  )
};

export default Main;