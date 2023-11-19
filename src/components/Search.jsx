import React, { useEffect, useState } from "react";
import { searchBooks, addIndBookToHome, searchAuthor, searchPublisher, searchTitle, searchISBN, searchBooksExactString, searchBooksByTwo } from "../api-client";
import { useNavigate, useParams } from "react-router-dom";
import "./Books.css";
import Images from "../media";

const Search = ({ isAdmin, category }) => {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const booksPerPage = 10;
  const { searchTerm } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  

  useEffect(() => {
  const handleSearch = async (response) => {
    const sortedResponse = response.sort((a, b) => {
      const availabilityA = a.availability.toLowerCase();
      const availabilityB = b.availability.toLowerCase();
      return (availabilityA === 'available at claitors' && availabilityB !== 'available at claitors') ? -1 :
             (availabilityA !== 'available at claitors' && availabilityB === 'available at claitors') ? 1 : 0;
    });

    setSortedBooks(sortedResponse);
    setLoading(false);
    setNoResult(response.length === 0);
  };

  const getBookBySearch = async () => {
    let response;

    switch (category) {
      case "":
        const [responseOne, responseTwo, responseThree] = await Promise.all([
          searchBooksExactString(searchTerm),
          searchBooksByTwo(searchTerm),
          searchBooks(searchTerm)
        ]);
        response = [...responseOne, ...responseTwo, ...responseThree];
        break;
      case 'title':
        response = await searchTitle(searchTerm);
        break;
      case 'author':
        response = await searchAuthor(searchTerm);
        break;
      case 'publisher':
        response = await searchPublisher(searchTerm);
        break;
      case 'isbn':
        response = await searchISBN(searchTerm);
        break;
      default:
        response = [];
    }

    const uniqueIds = new Set();
    const filteredResponse = response.filter((item) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });

    handleSearch(filteredResponse);
  };

  getBookBySearch();
  paginate(1);
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
      const response = await addIndBookToHome(
        "home-ind",
        book.title,
        book.description,
        `https://claitors.com/tphotos/${book.pk}`,
        `/books/details/${book.id}`,
        book.price
    );

      window.alert(`${book.title} added to home page!`);
    } catch (error) {
      console.error(error, 'Error adding book to home page in React');
    }
  };
  

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const displayedBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

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
        <div id='loading-container'>
          <i className="fa-solid fa-gear fa-spin fa-2xl" id='gear'></i>
          <h1 id="loading-books">Loading Books<span className="loading-dots"></span></h1>
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
                      <img
                        className="ind-book-image"
                        src={`https://claitors.com/tphotos/${book.pk}`}
                        alt={book.title}
                        onError={(e) => {
                          e.target.src = Images.claitorsLogo;
                        }}
                      />
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
                        <form
                          id="ind-form-books"
                          method="POST"
                          action="https://www.cartmanager.net/cgi-bin/cart.cgi"
                        >
                          <input
                            type="hidden"
                            name="AddItem"
                            value={`9917477|${book.title}|${price}|${qty}|${book.stocknumber}||prompt|${book.weight}||@10:10%`}
                          />
                          <h3 className="ind-book-price">Price</h3>
                          <select
                            className="ind-book-price-actual"
                            onChange={(e) => setPrice(e.target.value)}
                            name="VARcost1"
                            value={price}
                          >
                            <option defaultValue={book.price}>
                              {book.price} US
                            </option>
                            <option value={book.pricenonus}>
                              {book.pricenonus} INT
                            </option>
                          </select>
                          <input
                            className="qty-button"
                            type="hidden"
                            defaultValue={1}
                            onChange={(e) => setQty(e.target.value)}
                            name="VARQuantity1"
                          />
                          {book.availability.includes("out of print") ? (
                            <button
                              className="ind-book-cart"
                              name="I3"
                              onClick={() => navigate("/contact")}
                            >
                              Contact for Availability
                            </button>
                          ) : (
                            <button
                              className="ind-book-cart"
                              name="I3"
                              onClick={() => setPrice(book.price)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </form>
                      </div>
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
