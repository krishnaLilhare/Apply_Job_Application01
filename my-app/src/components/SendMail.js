import React, { useState } from 'react';

function SendMail() {
  const [attachment, setAttachment] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false); // State variable to control sending spinner

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true); // Start sending spinner

    const formData = new FormData();
    formData.append('attachment', attachment);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      const response = await fetch('http://localhost:8080/send-mail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Mail sent successfully');
        setSubject('');
        setMessage('');
      } else {
        alert('Failed to send mail');
      }
    } catch (error) {
      console.error('Error sending mail:', error.message);
      alert('An error occurred while sending mail');
    } finally {
      setSending(false); // Stop sending spinner
    }
  };

  return (
    <div className="container">
      <h2>Send Mail</h2>
      <div className="mail-details">
        <div className="input-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message Body:</label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="attachment">Resume:</label>
          <input
            type="file"
            className="form-control-file"
            id="attachment"
            accept=".pdf"
            onChange={handleAttachmentChange}
          />
        </div>
      </div>

      <div className="preview-details">
        <h3>Message Preview</h3>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message Body:</strong></p>
        <p>{message}</p>
        {attachment && (
          <p><strong>Resume:</strong> {attachment.name}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={sending}>
        {sending ? <span>Wait Mail Sending.......</span> : <span>Send Email</span>}
      </button>
    </div>
  );
}

export default SendMail;
