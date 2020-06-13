import React, { useState, useEffect } from "react";

import ContactTable from "./components/ContactTable";
import AddContactForm from "./components/AddContactForm";
import EditContactForm from "./components/EditContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(false);

  const initialContact = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  };

  const [currentContact, setCurrentContact] = useState(initialContact);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then((remoteContacts) => remoteContacts.json())
      .then((remoteContacts) => setContacts(remoteContacts));
  }, []);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);

    fetch("http://localhost:3001/contacts/create", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    console.log(contact);
  };

  const editContact = (contact) => {
    setCurrentContact(contact);
    setEditing(true);
  };

  const updateContact = (newContact) => {
    setContacts(
      contacts.map((contact) =>
        contact._id === newContact._id ? newContact : contact
      )
    );
    setEditing(false);

    fetch("http://localhost:3001/contacts/update", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
  };

  const deleteContact = (_id) => {
    setContacts(contacts.filter((contact) => contact._id !== _id));

    fetch("http://localhost:3001/contacts/delete", {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
  };

  return (
    <div className="container-fluid">
      <h1 style={{ textAlign: "center" }}>MERN Stack</h1>
      <div className="row">
        <div className="columns eight">
          <h2>Contacts</h2>
          <ContactTable
            contacts={contacts}
            deleteContact={deleteContact}
            editContact={editContact}
          />
        </div>
        <div className="columns four">
          {editing ? (
            <>
              <h2>Update Contact</h2>
              <EditContactForm
                currentContact={currentContact}
                updateContact={updateContact}
                setEditing={setEditing}
              />
            </>
          ) : (
            <>
              <h2>Add Contact</h2>
              <AddContactForm addContact={addContact} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
