import React, { useState, useEffect } from 'react';

function HRMail() {
  const [mails, setMails] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalFilteredMails, setTotalFilteredMails] = useState(0);
  const mailsPerPage = 15;

  useEffect(() => {
    fetchHRMails();
  }, [currentPage, searchQuery]);

  const fetchHRMails = () => {
    const startIndex = (currentPage - 1) * mailsPerPage;
    const endIndex = startIndex + mailsPerPage;
    fetch('http://localhost:8080/get-mails')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch HR mails');
        }
        return response.json();
      })
      .then(data => {
        let filteredMails = data;
        if (searchQuery) {
          filteredMails = data.filter(mail => mail.hrMail.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setTotalFilteredMails(filteredMails.length);
        const paginatedMails = filteredMails.slice(startIndex, endIndex);
        setMails(paginatedMails);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching HR mails:', error);
        setError('Failed to fetch HR mails. Please try again later.');
      });
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalFilteredMails / mailsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    const totalPages = Math.ceil(totalFilteredMails / mailsPerPage);
    setCurrentPage(totalPages);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust formatting as needed
  };

  const deleteAllMails = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all mails?");
    if (confirmDelete) {
      fetch('http://localhost:8080/delete-mail', {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete all mails');
        }
        // Assuming successful deletion, reset state
        setMails([]);
        setTotalFilteredMails(0);
        setError(null);
      })
      .catch(error => {
        console.error('Error deleting all mails:', error);
        setError('Failed to delete all mails. Please try again later.');
      });
    }
  };
  

  const sentMails = mails.filter(mail => mail.send);
  const notSentMails = mails.filter(mail => !mail.send);

  return (
    <div>
      <h2>All Mails</h2>
      <div className="mb-3">
        <input style={{ width: '300px' }} type="text" className="form-control small-search" placeholder="Search HR Mail" value={searchQuery} onChange={handleSearch} />
      </div>
      <br></br>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button className="btn btn-danger" onClick={deleteAllMails}>Delete All Mails</button>
      
      <div>
        <h3 style={{color:'green'}}>Sent Mails</h3>
        <table className="table table-bordered" style={{ color: 'black' }}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Serial Number</th>
              <th style={{ width: '300px' }}>HR Mail</th>
              <th style={{ width: '300px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {sentMails.map((mail, index) => (
              <tr key={mail.id}>
                <td style={{ color: 'black', width: '80px' }}>{(currentPage - 1) * mailsPerPage + index + 1}</td>
                <td style={{ color: 'black', width: '300px' }}>{mail.hrMail}</td>
                <td style={{ color: 'black', width: '300px' }}>{formatDate(mail.dateOfSend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      <div>
        <h3 style={{color:'red'}}>Not Sent Mails</h3>
        <table className="table table-bordered" style={{ color: 'black' }}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Serial Number</th>
              <th style={{ width: '300px' }}>HR Mail</th>
              <th style={{ width: '300px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {notSentMails.map((mail, index) => (
              <tr key={mail.id}>
                <td style={{ color: 'black', width: '80px' }}>{(currentPage - 1) * mailsPerPage + index + 1}</td>
                <td style={{ color: 'black', width: '300px' }}>{mail.hrMail}</td>
                <td style={{ color: 'black', width: '300px' }}>Not sent</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button className="btn btn-primary" onClick={firstPage} disabled={currentPage === 1}>First</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={prevPage} disabled={currentPage === 1}>Previous</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={nextPage} disabled={currentPage === Math.ceil(totalFilteredMails / mailsPerPage)}>Next</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={lastPage} disabled={currentPage === Math.ceil(totalFilteredMails / mailsPerPage)}>Last</button>
      </div>
    </div>
  );
}

export default HRMail;
