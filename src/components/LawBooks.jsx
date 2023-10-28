import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api-client/index";
import { useNavigate, useParams } from "react-router-dom";
import "./Books.css";

const LawBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const { id } = useParams();
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
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const filteredBooks = allBooks.filter((book) =>
  book.availability.includes("lacode") || 
  book.availability.includes("lacode lalaw") || 
  book.availability.includes("lalaw")
);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage); // Calculate the total number of pages

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById('books-heading');
    if(element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  };

  const renderPaginationButtons = () => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    return (
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => paginate(previousPage)}
              className="page-link"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </li>
        )}

        <li className="page-item">
          <button onClick={() => paginate(currentPage)} className="page-link">
            {currentPage}
          </button>
        </li>

        {currentPage < totalPages && (
          <li className="page-item">
            <button onClick={() => paginate(nextPage)} className="page-link">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div id="books-heading">
        <h1 className="books-heading-h1">Law Books</h1>
      </div>
      <div id="all-books-container">
        <h3 className="total-pages">
          Page {currentPage} of {totalPages}
        </h3>
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
      <div className="bottom-total-pages-container">
        <ul className="pagination">{renderPaginationButtons()}</ul>
      </div>
    </>
  );
};

export default LawBooks;
