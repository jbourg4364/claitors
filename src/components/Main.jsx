import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook, Footer, GPO, ClaitorsTitles, Contact, Search } from './Index';
import './Main.css';


const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
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
      <Route 
      path='/gpotitles'
      element={<GPO />} /> 
      <Route 
      path='/claitorstitles'
      element={<ClaitorsTitles />} /> 
      <Route 
      path='/contact'
      element={<Contact />} /> 
      <Route 
      path='/books/search/:keyword'
      element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} /> 
    </Routes>
    <Footer />
    </>
  )
};

export default Main;