import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Contact.css';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [message, setMessage] = useState("");

    const inputElement = useRef();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.alert(`Your message was sent to Claitor's!`);
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setState('');
        setZip('');
        setMessage('');
    };

  return (
    <>
      <div id="books-heading">
        <h1 className="books-heading-h1">Contact Us</h1>
      </div>
      <div id='form-content'>
      <form onSubmit={handleSubmit} ref={inputElement} id='contact-form' method="POST" action="http://claitors.com/cgi-bin/clt/claitorsbnb.cgi">
        <input 
          placeholder="Name"
          type="text"
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          placeholder="Email" 
          type="email"
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <input 
          placeholder="Phone" 
          type="tel"
          className="contact-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}

          />
        <input 
          placeholder="Company" 
          type="text"
          className="contact-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
      
          />
        <input 
          placeholder="State" 
          type="text"
          className="contact-input"
          value={state}
          onChange={(e) => setState(e.target.value)}
      
          />
          <input 
          placeholder="ZIP Code" 
          type="number"
          className="contact-input"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          />
          <input 
          placeholder="Message" 
          type="text"
          className="contact-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
        <button className='contact-button'>Submit</button>
      </form>
      </div>
    </>
  );
};

export default Contact