// src/Mail.js

import React, { useState, useEffect } from 'react';

function Mail() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = () => {
    fetch('http://localhost:8080/get-mail') // Assuming your backend API is running on localhost:8080
      .then(response => response.json())
      .then(data => {
        setMails(data); // Update component state with fetched data
      })
      .catch(error => {
        console.error('Error fetching mails:', error);
      });
  };

  return (
    <div>
      <div className="container">
        <h2>All Mails</h2>
        <ul>
          {mails.map(mail => (
            <li key={mail.id}>{mail.subject}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Mail;
