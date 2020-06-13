import React, { useState } from "react";

const AddContactForm = (props) => {
  const initContact = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  };

  const [contact, setContact] = useState(initContact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.firstname && contact.lastname && contact.phone && contact.email)
      props.addContact(contact);
    setContact(initContact);
  };

  return (
    <form>
      <label>First Name</label>
      <input
        type="text"
        name="firstname"
        onChange={handleChange}
        value={contact.firstname}
        className="u-full-width"
      />
      <label>Last Name</label>
      <input
        type="text"
        name="lastname"
        onChange={handleChange}
        value={contact.lastname}
        className="u-full-width"
      />
      <label>Phone</label>
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={contact.phone}
        className="u-full-width"
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={contact.email}
        className="u-full-width"
      />
      <button type="submit" className="primary-button" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};

export default AddContactForm;
