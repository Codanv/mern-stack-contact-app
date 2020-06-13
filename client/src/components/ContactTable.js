import React from "react";

const ContactTable = (props) => {
  return (
    <table width="u-full-width">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {props.contacts.length > 0 ? (
          props.contacts.map((contact) => {
            const { _id, firstname, lastname, phone, email } = contact;
            return (
              <tr key={_id}>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                  <button onClick={() => props.editContact(contact)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => props.deleteContact(_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>No record found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ContactTable;
