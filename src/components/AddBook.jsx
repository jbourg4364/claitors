import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import {createBook, uploadFile} from '../api-client/index';

const AddBook = ({ isAdmin }) => {
  const [title, setTitle] = useState("");
  const [fieldOne, setFieldOne] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [topic, setTopic] = useState("");
  const [family, setFamily] = useState("");
  const [pk, setPk] = useState("");
  const [DOC, setDoc] = useState("");
  const [author, setAuthor] = useState("");
  const [availability, setAvailability] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [binding, setBinding] = useState("");
  const [cover, setCover] = useState("");
  const [crossReference, setCrossReference] = useState("");
  const [description, setDescription] = useState("");
  const [extraDescription, setExtraDescription] = useState("");
  const [format, setFormat] = useState("");
  const [ISBN, setISBN] = useState("");
  const [ISSN, setISSN] = useState("");
  const [keyPhrases, setKeyPhrases] = useState("");
  const [listID, setListID] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [priceNonUS, setPriceNonUS] = useState("");
  const [publisher, setPublisher] = useState("");
  const [quantityPrice, setQuantityPrice] = useState("");
  const [standingOrderCode, setStandingOrderCode] = useState("");
  const [statusDate, setStatusDate] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [subjectBibliography, setSubjectBibliography] = useState("");
  const [suDocsClass, setSuDocsClass] = useState("");
  const [unit, setUnit] = useState("");
  const [unitNonUS, setUnitNonUS] = useState("");
  const [weight, setWeight] = useState("");
  const [yearPages, setYearPages] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [file, setFile] = useState("");


  const navigate = useNavigate();
  const inputElement = useRef();


  if (!isAdmin) {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileUploadResponse = await uploadFile(file);

      const response = await createBook(fieldOne,
        fieldTwo,
        fieldThree,
        topic,
        family,
        pk,
        DOC,
        author,
        availability,
        availableDate,
        binding,
        cover,
        crossReference,
        description,
        extraDescription,
        format,
        ISBN,
        ISSN,
        keyPhrases,
        listID,
        note,
        price,
        priceNonUS,
        publisher,
        quantityPrice,
        standingOrderCode,
        statusDate,
        stockNumber,
        subjectBibliography,
        suDocsClass,
        title,
        unit,
        unitNonUS,
        weight,
        yearPages,
        hyperlink );

        window.alert(`The book ${title} was created!`);
        navigate('/admin/dashboard');

    } catch (error) {
      console.error(error, 'Error creating book in React');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPk(selectedFile.name);
    setFile(selectedFile);
  };
  




  return (
    <>
      <div id="add-book-container">
        <h2 className="edit-title-banner">Add New Title</h2>
        <form className="add-book-form" ref={inputElement} onSubmit={handleSubmit} encType="multipart/form-data" action="/upload" method="POST">
          <input
            required
            placeholder="Title"
            className="add-book-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
          />
          <input
            placeholder="Field 1"
            className="add-book-input"
            onChange={(e) => setFieldOne(e.target.value)}
            type="text"
            value={fieldOne}
          />
          <input
            placeholder="Field 2"
            className="add-book-input"
            onChange={(e) => setFieldTwo(e.target.value)}
            type="text"
            value={fieldTwo}
          />
          <input
            placeholder="Field 3"
            className="add-book-input"
            onChange={(e) => setFieldThree(e.target.value)}
            type="text"
            value={fieldThree}
          />
          <input
            placeholder="Topic"
            className="add-book-input"
            onChange={(e) => setTopic(e.target.value)}
            type="text"
            value={topic}
          />
          <input
            placeholder="Family"
            className="add-book-input"
            onChange={(e) => setFamily(e.target.value)}
            type="text"
            value={family}
          />
          <input
            placeholder="pk"
            className="add-book-input"
            type="text"
            hidden

           
          />
          <input
            placeholder="DOC"
            className="add-book-input"
            onChange={(e) => setDoc(e.target.value)}
            type="text"
            value={DOC}
          />
          <input
            placeholder="Author"
            className="add-book-input"
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            value={author}
          />
          <input
            placeholder="Availability"
            className="add-book-input"
            onChange={(e) => setAvailability(e.target.value)}
            type="text"
            value={availability}
          />
          <input
            placeholder="Available Date"
            className="add-book-input"
            onChange={(e) => setAvailableDate(e.target.value)}
            type="text"
            value={availableDate}
          />
          <input
            placeholder="Binding"
            className="add-book-input"
            onChange={(e) => setBinding(e.target.value)}
            type="text"
            value={binding}
          />
          <input
            placeholder="Cover"
            className="add-book-input"
            onChange={(e) => setCover(e.target.value)}
            type="text"
            value={cover}
          />
          <input
            placeholder="Cross Reference"
            className="add-book-input"
            onChange={(e) => setCrossReference(e.target.value)}
            type="text"
            value={crossReference}
          />
          <textarea
            placeholder="Description"
            className="add-book-input"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            value={description}
          />
          <textarea
            placeholder="Extra Description"
            className="add-book-input"
            onChange={(e) => setExtraDescription(e.target.value)}
            type="text"
            value={extraDescription}
          />
          <input
            placeholder="Format"
            className="add-book-input"
            onChange={(e) => setFormat(e.target.value)}
            type="text"
            value={format}
          />
          <input
            placeholder="ISBN"
            className="add-book-input"
            onChange={(e) => setISBN(e.target.value)}
            type="text"
            value={ISBN}
          />
          <input
            placeholder="ISSN"
            className="add-book-input"
            onChange={(e) => setISSN(e.target.value)}
            type="text"
            value={ISSN}
          />
          <input
            placeholder="Key Phrases"
            className="add-book-input"
            onChange={(e) => setKeyPhrases(e.target.value)}
            type="text"
            value={keyPhrases}
          />
          <input
            placeholder="List ID"
            className="add-book-input"
            onChange={(e) => setListID(e.target.value)}
            type="text"
            value={listID}
          />
          <input
            placeholder="Note"
            className="add-book-input"
            onChange={(e) => setNote(e.target.value)}
            type="text"
            value={note}
          />
          <input
            placeholder="Price"
            className="add-book-input"
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            value={price}
            required
          />
          <input
            placeholder="Price Non US"
            className="add-book-input"
            onChange={(e) => setPriceNonUS(e.target.value)}
            type="text"
            value={priceNonUS}
          />
          <input
            placeholder="Publisher"
            className="add-book-input"
            onChange={(e) => setPublisher(e.target.value)}
            type="text"
            value={publisher}
          />
          <input
            placeholder="Quantity Price"
            className="add-book-input"
            onChange={(e) => setQuantityPrice(e.target.value)}
            type="text"
            value={quantityPrice}
          />
          <input
            placeholder="Standing Order Code"
            className="add-book-input"
            onChange={(e) => setStandingOrderCode(e.target.value)}
            type="text"
            value={standingOrderCode}
          />
          <input
            placeholder="Status Date"
            className="add-book-input"
            onChange={(e) => setStatusDate(e.target.value)}
            type="text"
            value={statusDate}
          />
          <input
            placeholder="Stock Number"
            className="add-book-input"
            onChange={(e) => setStockNumber(e.target.value)}
            type="text"
            value={stockNumber}
          />
          <input
            placeholder="Subject Bibliography"
            className="add-book-input"
            onChange={(e) => setSubjectBibliography(e.target.value)}
            type="text"
            value={subjectBibliography}
          />
          <input
            placeholder="SuDocs Class"
            className="add-book-input"
            onChange={(e) => setSuDocsClass(e.target.value)}
            type="text"
            value={suDocsClass}
          />
          <input
            placeholder="Unit"
            className="add-book-input"
            onChange={(e) => setUnit(e.target.value)}
            type="number"
            value={unit}
          />
          <input
            placeholder="Unit Non US"
            className="add-book-input"
            onChange={(e) => setUnitNonUS(e.target.value)}
            type="number"
            value={unitNonUS}
          />
          <input
            placeholder="Weight"
            className="add-book-input"
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            value={weight}
          />
          <input
            placeholder="Year Pages"
            className="add-book-input"
            onChange={(e) => setYearPages(e.target.value)}
            type="text"
            value={yearPages}
          />
          <input
            placeholder="Hyperlink"
            className="add-book-input"
            onChange={(e) => setHyperlink(e.target.value)}
            type="text"
            value={hyperlink}
          />
          <input 
          type="file"
          className="add-book-input"
          name="file"
          id="file"
          onChange={handleFileChange}
          />
          <button className="home-button-save" type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
