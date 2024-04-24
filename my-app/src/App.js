// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HRMail from './components/HRMail';
import SendMail from './components/SendMail';
import AddHrMail from './components/AddHrMail'; // Import the AddHrMail component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeTab, setActiveTab] = useState('hrMail');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <Header onTabChange={handleTabChange} />
      <div className="row">
        <div className="col">
          {/* Conditional rendering based on activeTab state */}
          {activeTab === 'hrMail' ? <HRMail /> : null}
          {activeTab === 'sendMail' ? <SendMail /> : null}
          {activeTab === 'addHrMail' ? <AddHrMail /> : null} {/* Render AddHrMail component */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
