import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api-client/index";
import { useNavigate } from "react-router-dom";
import "./Books.css";

const LawBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllLawBooks = async () => {
      try {
        const response = await getAllBooks();
        setAllBooks(response);
      } catch (error) {
        console.error(error, "Error getting all law books");
      }
    };
    getAllLawBooks();
  }, []);

  const handleDetail = async (id) => {
    navigate(`/books/details/${id}`);
  }

  return (
    <>
      <div id="books-heading">
        <h1 className="books-heading-h1">Law Books</h1>
      </div>
      <div id="all-books-container">
        {allBooks.map((book) => {
          if (
            (book.field_1 === "lacode") |
            (book.field_1 === "lacode lalaw") |
            (book.field_1 === "lalaw")
          ) {
            return (
              <div key={book.id} id="ind-book-container">
                <div className="ind-book-left-container">
                  <h2 className="ind-book-title">{book.title}</h2>
                  <button className="ind-book-details" onClick={() => handleDetail(book.id)}>Details</button>
                </div>
                <div className="ind-price-container">
                    <h3 className="ind-book-price">Price</h3>
                    <select className="ind-book-price-actual">
                        <option>${book.price} US</option>
                        <option>${book.pricenonus} INT</option>
                    </select>
                </div>
                
                <button className="ind-book-cart">Add to Cart</button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default LawBooks;
