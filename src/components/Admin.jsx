import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';
import { getLast10Books, deleteBook } from '../api-client';
import Images from '../media';


const Admin = ({ isAdmin }) => {
  const [books, setBooks] = useState([]);
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

  return (
    <div id="admin-dash-container">
      <h2 className="edit-title-banner">Welcome Back!</h2>
      <h3>Recently Added Titles</h3>
      <div id="books-admin-dash-container">
        {books.map((book) => (
   
            <div className="featured-ind-container-edit-admin" key={book.id}>
              <img
                // src={`https://claitors.com/tphotos/${book.pk}`}
                src={`/tphotos/${book.pk}`}
                className="featured-image-edit"
                alt={book.title}
                onError={(e) => {
                  e.target.src = Images.claitorsLogo;
                }}
              />
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
    </div>
  );
};

export default Admin;