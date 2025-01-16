import React, { useEffect, useState } from "react";
import {
  searchBooks,
  addIndBookToHome,
  searchAuthor,
  searchPublisher,
  searchTitle,
  searchISBN,
  deleteBook,
} from "../api-client";
import { useNavigate, useParams } from "react-router-dom";
import "./Books.css";
import Images from "../media";
import LazyLoad from "react-lazyload";

const Search = ({ isAdmin, category }) => {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  // const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [options, optionsOpen] = useState(false);
  const [homeCategory, setHomeCategory] = useState("home-ind");
  const booksPerPage = 10;
  const { searchTerm } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookPrices, setBookPrices] = useState({});

  useEffect(() => {
    const handleSearch = async (response) => {
      const sortedResponse = response.sort((a, b) => {
        const availabilityA = a.availability.toLowerCase();
        const availabilityB = b.availability.toLowerCase();
        return availabilityA === "available at claitors" &&
          availabilityB !== "available at claitors"
          ? -1
          : availabilityA !== "available at claitors" &&
            availabilityB === "available at claitors"
          ? 1
          : 0;
      });

      setSortedBooks(sortedResponse);
      setLoading(false);
      setNoResult(response.length === 0);
    };

    const getBookBySearch = async () => {
      let response;

      switch (category) {
        case "":
          response = await searchBooks(searchTerm);
          break;
        case "title":
          response = await searchTitle(searchTerm);
          break;
        case "author":
          response = await searchAuthor(searchTerm);
          break;
        case "publisher":
          response = await searchPublisher(searchTerm);
          break;
        case "isbn":
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
  }, [searchTerm, category]);

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
        homeCategory,
        book.title,
        book.description,
        `/${book.pk}`,
        `/books/details/${book.id}`,
        book.price
      );

      window.alert(`${book.title} added to home page!`);
      optionsOpen(false);
      setHomeCategory("");
    } catch (error) {
      console.error(error, "Error adding book to home page in React");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
      );

      if (confirmDelete) {
        await deleteBook(id);
        window.alert("This book has been deleted.");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error, "Error deleting book in react");
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

  const handlePriceChange = (bookId, newPrice) => {
    setBookPrices((prevPrices) => {
      return {
        ...prevPrices,
        [bookId]: newPrice, // Update price for specific book
      };
    });
  };


  return (
    <>
      <div id="books-heading">
        <h1 className="books-heading-h1">Search results for "{searchTerm}"</h1>
      </div>
      {loading ? (
        <div id="loading-container">
          <i className="fa-solid fa-gear fa-spin fa-2xl" id="gear"></i>
          <h1 id="loading-books">
            Loading Books<span className="loading-dots"></span>
          </h1>
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
                      <LazyLoad height={200} offset={100}>
                        <img
                          className="ind-book-image"
                          src={`/${book.pk}`}
                          alt={book.title}
                          onError={(e) => {
                            e.target.src = Images.claitorsLogo;
                          }}
                        />
                      </LazyLoad>
                      <div className="ind-book-left-container">
                        <h2 className="ind-book-title">{book.title}</h2>
                        <div className="ind-book-button-container">
                          {options ? null : (
                            <button
                              className="ind-book-details"
                              onClick={() => handleDetail(book.id)}
                            >
                              Details
                            </button>
                          )}

                          {isAdmin && !options ? (
                            <>
                              <button
                                className="ind-book-details"
                                onClick={() => handleEdit(book.id)}
                              >
                                Edit Book
                              </button>
                              <button
                                className="ind-book-details"
                                onClick={() => optionsOpen(true)}
                              >
                                <i className="fa-solid fa-plus fa-xl"></i>
                              </button>
                              <button
                                className="ind-book-details"
                                onClick={() => handleDelete(book.id)}
                              >
                                <i className="fa-solid fa-trash fa-xl"></i>
                              </button>
                            </>
                          ) : null}
                          {isAdmin && options ? (
                            <>
                              <select
                                id="select-add-featured"
                                onChange={(e) =>
                                  setHomeCategory(e.target.value)
                                }
                                defaultValue={homeCategory}
                              >
                                <option value={"home-main-banner"}>
                                  Main Banner
                                </option>
                                <option value={"home-ind"}>
                                  Featured Titles
                                </option>
                                <option value={"home-ind-law"}>
                                  Top Law Titles
                                </option>
                                <option value={"home-ind-gpo"}>
                                  Top GPO Titles
                                </option>
                                <option value={"home-ind-genealogy"}>
                                  Top Genealogy Titles
                                </option>
                              </select>
                              <button
                                className="ind-book-details"
                                onClick={() => handleAddToHome(book)}
                              >
                                Save
                              </button>
                              <button
                                className="ind-book-details"
                                onClick={() => optionsOpen(false)}
                              >
                                Cancel
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
                            value={`9917477|${book.title}|${bookPrices[book.id] || book.price}|${qty}|${book.stocknumber}||prompt|${book.weight}||@10:10%`}
                          />
                          <h3 className="ind-book-price">Price</h3>
                          <select
                            className="ind-book-price-actual"
                            onChange={(e) =>
                              handlePriceChange(book.id, e.target.value)
                            }
                            name="VARcost1"
                            value={bookPrices[book.id] || book.price}
                          >
                            <option value={book.price}>
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
                          {book.availability.includes("out of print") ||
                          book.availability.includes("superseded") ||
                          book.availability.includes("no stock") ||
                          book.availability.includes("pending") ||
                          book.availability.includes("replaced by") ? (
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
