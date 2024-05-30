import React, { useState } from 'react';
import './Header.css';
import logo from '../asset/header-logo.png';
import { FaUserCircle } from 'react-icons/fa';
import LogoutDialog from './LogoutDialog';  

const Header = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleCloseLogoutDialog = () => {
    setShowLogoutDialog(false);
  };

  const handleLogout = () => {
    window.location.href = '/';
    console.log("Logging out...");
  };

  return (
    <header className="header d-flex align-items-center justify-content-between px-3">
      <div className="d-flex align-items-center">
        <img src={logo} alt="Digitalflake Logo" className="header-logo" />
      </div>
      <FaUserCircle className="header-icon" onClick={() => setShowLogoutDialog(true)} />
      <LogoutDialog show={showLogoutDialog} handleClose={handleCloseLogoutDialog} handleLogout={handleLogout} /> {/* Pass props to the LogoutDialog component */}
    </header>
  );
};

export default Header;
