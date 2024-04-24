import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ onTabChange }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div style={{color : "brown"}}><h1 className="text-center">Krishna Lilhare</h1>
          </div> 
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-link font-weight-bold" onClick={() => onTabChange('hrMail')}><h5>HR Mail</h5></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link font-weight-bold" onClick={() => onTabChange('sendMail')}><h5>Send Mail</h5></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link font-weight-bold" onClick={() => onTabChange('addHrMail')}><h5>Add HR Mail</h5></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
