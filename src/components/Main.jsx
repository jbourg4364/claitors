import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook, Footer, GPO, ClaitorsTitles, Contact, Search, Login, Admin, HomePageEdit, AdminNav, AddBook, EditBook } from './Index';
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
      element={<Home isAdmin={isAdmin}/>}
      />
      <Route 
      exact path='/lawbooks'
      element={<LawBooks isAdmin={isAdmin}/>}
      />
      <Route 
      path='/books/details/:id'
      element={<IndBook isAdmin={isAdmin}/>} /> 
      <Route 
      path='/gpotitles'
      element={<GPO isAdmin={isAdmin}/>} /> 
      <Route 
      path='/claitorstitles'
      element={<ClaitorsTitles isAdmin={isAdmin}/>} /> 
      <Route 
      path='/contact'
      element={<Contact isAdmin={isAdmin}/>} /> 
      <Route 
      path='/books/search/:searchTerm'
      element={<Search isAdmin={isAdmin}/>} /> 
      <Route 
      path='/login'
      element={<Login />} /> 
      <Route 
      path='/admin/dashboard'
      element={<Admin isAdmin={isAdmin}/>} /> 
      <Route 
      path='/content'
      element={<HomePageEdit isAdmin={isAdmin} />} /> 
      <Route 
      path='/admin/addBook'
      element={<AddBook isAdmin={isAdmin} />} /> 
      <Route 
      path='/books/edit/:id'
      element={<EditBook isAdmin={isAdmin} />} /> 
    </Routes>
    <Footer isAdmin={isAdmin} />
    </>
  )
};

export default Main;