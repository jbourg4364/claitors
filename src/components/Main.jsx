import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Nav, LawBooks, IndBook, Footer, GPO, ClaitorsTitles, Contact, Search, Login, Admin, HomePageEdit, AdminNav, AddBook, EditBook, Genealogy } from './Index';
import './Main.css';


const Main = () => {
  const [category, setCategory] = useState(localStorage.getItem('category'));
  const storedId = localStorage.getItem('id');
  const isAdmin = storedId === 'admin';
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/') {
    localStorage.setItem('category', '');
  };
  }, [location.pathname]);
  


  return (
    <>
    {!isAdmin ? (
      <Nav category={category} setCategory={setCategory} />
    ) : (
      <AdminNav category={category} setCategory={setCategory}/>
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
      path='/genealogy'
      element={<Genealogy isAdmin={isAdmin}/>} /> 
      <Route 
      path='/contact'
      element={<Contact isAdmin={isAdmin}/>} /> 
      <Route 
      path='/books/search/:searchTerm'
      element={<Search isAdmin={isAdmin} category={category} setCategory={setCategory}/>} /> 
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
    {location.pathname === '/' ? (null) : (
      <Footer isAdmin={isAdmin} />
    )}
    
    </>
  )
};

export default Main;