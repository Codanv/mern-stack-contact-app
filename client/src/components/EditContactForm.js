import React, { useState, useEffect } from "react";

const EditContactForm = (props) => {
  const [contact, setContact] = useState(props.currentContact);

  useEffect(() => {
    setContact(props.currentContact);
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.firstname && contact.lastname && contact.phone && contact.email)
      props.updateContact(contact);
  };

  return (
    <form>
      <input
        type="hidden"
        name="_id"
        onChange={handleChange}
        value={contact._id}
        className="u-full-width"
      />
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
        Save
      </button>{" "}
      <button
        type="submit"
        className="primary-button"
        onClick={() => props.setEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditContactForm;
