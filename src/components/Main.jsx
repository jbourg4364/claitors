import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook, Footer, GPO, ClaitorsTitles, Contact, Search, Login, Admin, HomePageEdit, AdminNav } from './Index';
import './Main.css';


const Main = () => {
  const storedId = localStorage.getItem('id');
  const isAdmin = storedId === 'admin';
  const location = useLocation();


  return (
    <>
    {!isAdmin ? (
      <Nav />
    ) : (
      <AdminNav />
    )}
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
      path='/books/search/:searchTerm'
      element={<Search />} /> 
      <Route 
      path='/login'
      element={<Login />} /> 
      <Route 
      path='/admin/dashboard'
      element={<Admin isAdmin={isAdmin}/>} /> 
      <Route 
      path='/admin/homePageEdit'
      element={<HomePageEdit isAdmin={isAdmin} />} /> 
    </Routes>
    <Footer isAdmin={isAdmin} />
    </>
  )
};

export default Main;