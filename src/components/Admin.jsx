import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';
import { getLast10Books, deleteBook, uploadMultipleFiles } from '../api-client';
import Images from '../media';
import LazyLoad from 'react-lazyload';


const Admin = ({ isAdmin }) => {
  const [books, setBooks] = useState([]);
  const [files, setFiles] = useState([]);
  const inputElement = useRef();
  let navigate = useNavigate();


  if (!isAdmin) {
    navigate("/login");
  }

  useEffect(() => {
    const getBooks = async () => {
      const response = await getLast10Books();
      setBooks(response);
    };
    getBooks();
  }, []);

  const handleEdit = async (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this book?');
  
      if (confirmDelete) {
        await deleteBook(id);
        window.alert('This book has been deleted.');
        const response = await getLast10Books();
        setBooks(response);
      };
      
    } catch (error) {
      console.error(error, 'Error deleting book in react');
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(Array.from(selectedFiles));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileUploadResponse = await uploadMultipleFiles(files);
      console.log("File upload response:", fileUploadResponse);

      if (fileUploadResponse && fileUploadResponse.message === 'Files uploaded successfully') {
        window.alert("Files uploaded successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error, 'Error uploading files in React');
    }
  };
  

 


  return (
    <div id="admin-dash-container">
      <h2 className="edit-title-banner">Welcome Back!</h2>
      <h3>Recently Added Titles</h3>
      <div id="books-admin-dash-container">
        {books.map((book) => (
   
            <div className="featured-ind-container-edit-admin" key={book.id}>
              <LazyLoad height={200} offset={100}>
                <img
                src={`/${book.pk}`}
                className="featured-image-edit"
                alt={book.title}
                onError={(e) => {
                  e.target.src = Images.claitorsLogo;
                }}
              />
              </LazyLoad>
              <h3 className="featured-ind-heading-edit">{book.title}</h3>
              <button
                className="ind-book-details-admin"
                onClick={() => handleEdit(book.id)}
              >
                Edit Book
              </button>
              <button
                className="featured-button-edit"
                id="trash-edit-admin"
                onClick={() => handleDelete(book.id)}
              >
                <i className="fa-solid fa-trash fa-xl"></i>
              </button>
            </div>
    
        ))}
      </div>
      <div>
        <h2>Upload Multiple Image Files</h2>
        <form className="tphotos-upload-form" ref={inputElement} onSubmit={handleSubmit} encType="multipart/form-data" action="/api/upload/multiple" method="POST">
        <input 
          type="file"
          className="add-book-input"
          name="files"
          id="files"
          onChange={handleFileChange}
          multiple
        />
        <button className="home-button-save" type="submit">Upload</button>
        </form>
      </div>
      
    </div>
  );
};

export default Admin;