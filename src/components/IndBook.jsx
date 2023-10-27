import React, { useState, useEffect } from "react";
import { getBookById } from "../api-client/index";
import { useParams } from "react-router";
import './IndBook.css';

const IndBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getBookDetails = async () => {
      const response = await getBookById(id);
      setBook(response);
    };
    getBookDetails();
  }, []);

  return (
    <div id="ind-detail-container">
      <h1 className="ind-detail-title">{book.title}</h1>
      <table className="ind-detail-table">
        <tbody>
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
      <div id="ind-book-detail-price-container">
        <select className="ind-book-price-actual-detail">
          <option>${book.price} US</option>
          <option>${book.pricenonus} INT</option>
        </select>
        <button className="ind-book-cart-detail">Add to Cart</button>
      </div>
    </div>
  );
};

export default IndBook;
