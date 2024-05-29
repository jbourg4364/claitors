import React, { useState, useEffect } from "react";
import { getBookById } from "../api-client/index";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./IndBook.css";
import Images from "../media";

const IndBook = ({ isAdmin }) => {
  const [book, setBook] = useState({});
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [unavailable, setUnavailable] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await getBookById(id);
      setBook(response);
      setPrice(response.price);
      if (
        response.availability.includes("out of print") ||
        response.availability.includes("superseded") ||
        response.availability.includes("replaced by") ||
        response.availability.includes("no stock") ||
        response.availability.includes("pending")
      ) {
        setUnavailable(true);
      }
    };
    getBookDetails();
  }, []);

  return (
    <div id="ind-detail-container">
      <h1 className="ind-detail-title">{book.title}</h1>
      <div id="ind-detail-img-table-container">
        <img
          className="ind-book-image-detail"
          src={`/${book.pk}`}
          alt={book.title}
          onError={(e) => {
            e.target.src = Images.claitorsLogo;
          }}
        />
        <table className="ind-detail-table">
          <tbody>
            <tr>
              <td>Author:</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <td>Stock Number:</td>
              <td>{book.stocknumber}</td>
            </tr>
            <tr>
              <td>Availability:</td>
              <td>{book.availability}</td>
            </tr>
            <tr>
              <td>US Price:</td>
              <td>${book.price}</td>
            </tr>
            <tr>
              <td>INT Price:</td>
              <td>{book.pricenonus}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{book.description}</td>
            </tr>
            <tr>
              <td>Publisher:</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <td>Year Pages:</td>
              <td>{book.yearpages}</td>
            </tr>
            <tr>
              <td>Binding:</td>
              <td>{book.binding}</td>
            </tr>
            <tr>
              <td>Note:</td>
              <td>{book.note}</td>
            </tr>
            <tr>
              <td>Key Phrases:</td>
              <td>{book.keyphrase}</td>
            </tr>
            <tr>
              <td>ISBN:</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>{book.weight}</td>
            </tr>
            <tr>
              <td>Availability Date:</td>
              <td>{book.availabledate}</td>
            </tr>
            <tr>
              <td>Subject:</td>
              <td>{book.subject}</td>
            </tr>
            <tr>
              <td>Status Date:</td>
              <td>{book.statusdate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="ind-book-detail-price-container">
        <form
          method="POST"
          action="https://www.cartmanager.net/cgi-bin/cart.cgi"
        >
          <input
            type="hidden"
            name="AddItem"
            value={`9917477|${book.title}|${price}|${qty}|${book.stocknumber}||prompt|${book.weight}||@10:10%`}
          />
          <select
            className="ind-book-price-actual-detail"
            onChange={(e) => setPrice(e.target.value)}
            name="VARcost1"
          >
            <option defaultValue={book.price}>{book.price} US</option>
            <option value={book.pricenonus}>{book.pricenonus} INT</option>
          </select>
          {isAdmin ? null : (
            <div id="qty-price-container">
              <label>
                Qty
                <input
                  className="qty-button"
                  type="number"
                  defaultValue={1}
                  onChange={(e) => setQty(e.target.value)}
                  name="VARQuantity1"
                />
              </label>
              {unavailable ? (
                <button
                  className="ind-book-cart-detail"
                  name="I3"
                  onClick={() => navigate("/contact")}
                >
                  Contact for Availability
                </button>
              ) : (
                <button className="ind-book-cart-detail" name="I3">
                  Add to Cart
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default IndBook;
