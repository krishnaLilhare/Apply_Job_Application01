import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function AddHrMail() {
  const [hrMail, setEmail] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingAddMail, setLoadingAddMail] = useState(false); // State variable for "Add Mail" button loading
  const [loadingAddMailCSV, setLoadingAddMailCSV] = useState(false); // State variable for "Add Mail Using CSV File" button loading

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = async () => {
    try {
      setLoadingAddMail(true); // Start "Add Mail" button loading spinner
      // Call the backend API to add the email
      const response = await axios.post('http://localhost:8080/add-mail', { hrMail });
      console.log(response.data); // Log the response from the backend
      // Show success message
      setSuccessMessage('Email added successfully.');
      // Clear the email input after successful submission
      setEmail('');
    } catch (error) {
      console.error('Error adding email:', error);
      // Show error message
      setErrorMessage('Error adding email. Please try again.');
    } finally {
      setLoadingAddMail(false); // Stop "Add Mail" button loading spinner
    }
  };

  const handleSubmitUsingCSV = async (event) => {
    event.preventDefault();
    setLoadingAddMailCSV(true); // Start "Add Mail Using CSV File" button loading spinner
    const formData = new FormData();
    formData.append('attachment', attachment);

    try {
      const response = await fetch('http://localhost:8080/add-mails-csv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Mail Save Using CSV successfully');
      } else {
        alert('Failed to Save mail');
      }
    } catch (error) {
      console.error('Error Save mail:', error.message);
      alert('An error occurred while Save mail');
    } finally {
      setLoadingAddMailCSV(false); // Stop "Add Mail Using CSV File" button loading spinner
    }
  };

  return (
    <div>
      <h2>Add Mail</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input style={{ width: '300px' }} type="email" className="form-control" id="email" value={hrMail} onChange={handleEmailChange} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={loadingAddMail}>
        {loadingAddMail ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">Wait...</span>
        ) : (
          <span>Add Mail</span>
        )}
      </button>
      <br />
      <br />
      <br />
      <h2>Add Mail Using CSV File</h2>
      <div className="form-group">
        <label htmlFor="attachment">Add CSV File:</label>
        <input
          type="file"
          className="form-control-file"
          id="attachment"
          accept=".csv"
          onChange={handleAttachmentChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmitUsingCSV} disabled={loadingAddMailCSV}>
        {loadingAddMailCSV ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">Wait...</span>
        ) : (
          <span>Add Mail Using CSV File</span>
        )}
      </button>
    </div>
  );
}

export default AddHrMail;
