 
import React from 'react';
import './MainContent.css';
import logo from '../asset/digi-logo.png';

const MainContent = () => {
  return (
    <div className="main-content d-flex align-items-center justify-content-center">
      <div className="text-center">
        <img src={logo} alt="Digitalflake Logo" className="main-logo" />
        <h2>Welcome to Digitalflake admin</h2>
      </div>
    </div>
  );
};

export default MainContent;
