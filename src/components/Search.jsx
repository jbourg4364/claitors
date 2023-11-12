import React, { useEffect, useState } from "react";
import { searchBooks, addIndBookToHome } from "../api-client";
import { useNavigate, useParams } from "react-router-dom";
import "./Books.css";

const Search = ({ isAdmin }) => {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const booksPerPage = 10;
  const { searchTerm } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookBySearch = async () => {
      const response = await searchBooks(searchTerm);
      setSortedBooks(response);
      setLoading(false);
      if (response.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    };
    getBookBySearch();
  }, [searchTerm]);


  const handleDetail = async (id) => {
    navigate(`/books/details/${id}`);
    window.scrollTo(0, 0);
  };

  const handleEdit = async (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleAddToHome = async (book) => {
    try {
      const response = await addIndBookToHome({
        label: "home-ind",
        title: book.title,
        description: book.description,
        imageurl: book.hyperlink,
        buttonurl: `/books/details/${book.id}`,
        price: book.price
      });
      window.alert(`${book.title} added to home page!`);
    } catch (error) {
      console.error(error, 'Error adding book to home page in React');
    }
  };
  

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const displayedBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage); // Calculate the total number of pages

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("books-heading");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
        <h1 className="books-heading-h1">Search results for "{searchTerm}"</h1>
      </div>
      {loading ? (
        <div>
          <h1 id="loading-books">Loading Books...</h1>
        </div>
      ) : (
        <>
          {noResult ? (
            <div>
              <h1 id="loading-books">No books found.</h1>
            </div>
          ) : (
            <>
              <div id="all-books-container">
                <h3 className="total-pages">
                  Page {currentPage} of {totalPages}
                </h3>
                {displayedBooks.map((book) => {
                  return (
                    <div key={book.id} id="ind-book-container">
                      <div className="ind-book-left-container">
                        <h2 className="ind-book-title">{book.title}</h2>
                        <div className="ind-book-button-container">
                          <button
                            className="ind-book-details"
                            onClick={() => handleDetail(book.id)}
                          >
                            Details
                          </button>
                          {isAdmin ? (
                            <>
                              <button
                                className="ind-book-details"
                                onClick={() => handleEdit(book.id)}
                              >
                                Edit Book
                              </button>
                              <button 
                                className="ind-book-details"
                                onClick={() => handleAddToHome(book)}
                              >
                                <i className="fa-solid fa-plus fa-xl"></i>
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="ind-price-container">
                        <h3 className="ind-book-price">Price</h3>
                        <select className="ind-book-price-actual">
                          <option>${book.price} US</option>
                          <option>${book.pricenonus} INT</option>
                        </select>
                      </div>
                      {isAdmin ? null : (
                        <button className="ind-book-cart">Add to Cart</button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="bottom-total-pages-container">
                <ul className="pagination">{renderPaginationButtons()}</ul>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
