import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api-client/index";
import { useNavigate, useParams } from "react-router-dom";
import "./Books.css";
import Images from "../media";

const Genealogy = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const booksPerPage = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookPrices, setBookPrices] = useState({});

  useEffect(() => {
    const getAllLawBooks = async () => {
      try {
        const response = await getAllBooks();
        setAllBooks(response);
        setLoading(false);
      } catch (error) {
        console.error(error, "Error getting all law books");
        setLoading(false);
      }
    };
    getAllLawBooks();
  }, []);

  const handleDetail = async (id) => {
    navigate(`/books/details/${id}`);
    window.scrollTo(0, 0);
  };

  const compareAvailability = (bookA, bookB) => {
    const availabilityA = bookA.availability.toLowerCase();
    const availabilityB = bookB.availability.toLowerCase();

    const isAvailableA = availabilityA.includes("available");
    const isAvailableB = availabilityB.includes("available");

    if (isAvailableA && !isAvailableB) {
      return -1;
    } else if (!isAvailableA && isAvailableB) {
      return 1;
    }
    return 0;
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const filteredBooks = allBooks.filter((book) =>
    book.field_1.includes("genealogy")
  );
  const sortedBooks = filteredBooks.sort(compareAvailability);
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage); // Calculate the total number of pages

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
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
        <h1 className="books-heading-h1">Genealogy</h1>
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
          <div id="all-books-container">
            <h3 className="total-pages">
              Page {currentPage} of {totalPages}
            </h3>
            {currentBooks.map((book) => (
              <div key={book.id} id="ind-book-container">
                <img
                  className="ind-book-image"
                  src={`/${book.pk}`}
                  alt={book.title}
                  onError={(e) => {
                    e.target.src = Images.claitorsLogo;
                  }}
                />
                <div className="ind-book-left-container">
                  <h2 className="ind-book-title">{book.title}</h2>
                  <button
                    className="ind-book-details"
                    onClick={() => handleDetail(book.id)}
                  >
                    Details
                  </button>
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
                      <option value={book.price}>{book.price} US</option>
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
                        onClick={() => setPrice(book.price)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom-total-pages-container">
            <ul className="pagination">{renderPaginationButtons()}</ul>
          </div>
        </>
      )}
    </>
  );
};

export default Genealogy;
