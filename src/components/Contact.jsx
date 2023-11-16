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
        <input type="hidden" name="submit_to" value="claitors@claitors.com" />
        <input type="hidden" name="form_id" value="Information_Request" />
        <input type="hidden" name="ok_url" value="http://claitors.com/thankyou.htm"/>
        <input type="hidden" name="outputfile" value="chamerinfolog.log" />
        <input type="hidden" name="automessage"  value="replytext.txt"/>
        <input type="hidden" name="data_order" value="Name,submit_by,Phone,Company,State,ZIP,Comments" />
        <input 
          placeholder="Name"
          type="text"
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          name="Name"
        />
        <input 
          placeholder="Email" 
          type="email"
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="submit_by"
          />
          <input 
          placeholder="Phone" 
          type="text"
          className="contact-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="Phone"
          />
        <input 
          placeholder="Company" 
          type="text"
          className="contact-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="Company"
          />
        <select name="State" onChange={(e) => setState(e.target.value)}  id='state-dropdown' value={state} >
                <option hidden>State</option>
                <option>AK</option>
                <option>AL</option>
                <option>AR</option>
                <option>AZ</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DC</option>
                <option>CE</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>IA</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>MA</option>
                <option>MD</option>
                <option>ME</option>
                <option>MI</option>
                <option>MN</option>
                <option>MO</option>
                <option>MS</option>
                <option>MT</option>
                <option>NC</option>
                <option>ND</option>
                <option>NE</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NV</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VA</option>
                <option>VT</option>
                <option>WA</option>
                <option>WI</option>
                <option>WV</option>
                <option>WY</option>
              </select>
          <input 
          placeholder="ZIP Code" 
          type="text"
          className="contact-input"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          name="ZIP"
          />
          
          <textarea
          placeholder="Message" 
          type="text"
          className="contact-input"
          id='message-contact'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{height: '100px'}}
          name="Comments"
          />
        <button className='contact-button'>Submit</button>
      </form>
      </div>
    </>
  );
};

export default Contact