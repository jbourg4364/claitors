import React, { useState, useEffect, useRef } from "react";
import { getBookById, editBook } from "../api-client/index";
import { useParams } from "react-router";
import './IndBook.css';
import { useNavigate } from "react-router-dom";

const EditBook = ({ isAdmin }) => {
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

  let navigate = useNavigate();
  const [book, setBook] = useState({});
  const { id } = useParams();
  const inputElement = useRef();

  if (!isAdmin) {
    navigate("/login");
  }

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await getBookById(id);
      setBook(response);
      const initialState = {
        title: response.title || "",
        fieldOne: response.fieldOne || "",
        fieldTwo: response.fieldTwo || "",
        fieldThree: response.fieldThree || "",
        topic: response.topic || "",
        family: response.family || "",
        pk: response.pk || "",
        DOC: response.DOC || "",
        author: response.author || "",
        availability: response.availability || "",
        availableDate: response.availableDate || "",
        binding: response.binding || "",
        cover: response.cover || "",
        crossReference: response.crossReference || "",
        description: response.description || "",
        extraDescription: response.extraDescription || "",
        format: response.format || "",
        ISBN: response.ISBN || "",
        ISSN: response.ISSN || "",
        keyPhrases: response.keyPhrases || "",
        listID: response.listID || "",
        note: response.note || "",
        price: response.price || "",
        priceNonUS: response.priceNonUS || "",
        publisher: response.publisher || "",
        quantityPrice: response.quantityPrice || "",
        standingOrderCode: response.standingOrderCode || "",
        statusDate: response.statusDate || "",
        stockNumber: response.stockNumber || "",
        subjectBibliography: response.subjectBibliography || "",
        suDocsClass: response.suDocsClass || "",
        unit: response.unit || "",
        unitNonUS: response.unitNonUS || "",
        weight: response.weight || "",
        yearPages: response.yearPages || "",
        hyperlink: response.hyperlink || ""
      };
      
      
      setInitialStates(initialState);      
    };
    getBookDetails();
  }, [id]);

  const setInitialStates = (initialState) => {
    setTitle(initialState.title);
    setFieldOne(initialState.fieldOne);
    setFieldTwo(initialState.fieldTwo);
    setFieldThree(initialState.fieldThree);
    setTopic(initialState.topic);
    setFamily(initialState.family);
    setPk(initialState.pk);
    setDoc(initialState.DOC);
    setAuthor(initialState.author);
    setAvailability(initialState.availability);
    setAvailableDate(initialState.availableDate);
    setBinding(initialState.binding);
    setCover(initialState.cover);
    setCrossReference(initialState.crossReference);
    setDescription(initialState.description);
    setExtraDescription(initialState.extraDescription);
    setFormat(initialState.format);
    setISBN(initialState.ISBN);
    setISSN(initialState.ISSN);
    setKeyPhrases(initialState.keyPhrases);
    setListID(initialState.listID);
    setNote(initialState.note);
    setPrice(initialState.price);
    setPriceNonUS(initialState.priceNonUS);
    setPublisher(initialState.publisher);
    setQuantityPrice(initialState.quantityPrice);
    setStandingOrderCode(initialState.standingOrderCode);
    setStatusDate(initialState.statusDate);
    setStockNumber(initialState.stockNumber);
    setSubjectBibliography(initialState.subjectBibliography);
    setSuDocsClass(initialState.suDocsClass);
    setUnit(initialState.unit);
    setUnitNonUS(initialState.unitNonUS);
    setWeight(initialState.weight);
    setYearPages(initialState.yearPages);
    setHyperlink(initialState.hyperlink);
  };

  const tryEditBook = async (id) => {
    
    try {
      const response = await editBook(
        id,
        fieldOne,
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

        window.alert(`The book ${title} was edited!`);
        navigate('/admin/dashboard');

    } catch (error) {
      console.error(error, 'Error editing book in React');
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h2 className="edit-title-banner">Edit: {title}</h2>
        <form className="add-book-form" ref={inputElement} onSubmit={handleSubmit}>
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
            onChange={(e) => setPk(e.target.value)}
            type="text"
            value={pk}
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
          <button className="home-button-save" type="submit" onClick={() => tryEditBook(book.id)}>Save</button>
        </form>
    </div>
  )
};

export default EditBook;