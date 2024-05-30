 
import React, { useState } from 'react';
import './Sidebar.css';
import { FaHome, FaUsers, FaCog } from 'react-icons/fa';

const Sidebar = ({ onSidebarItemClick }) => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSidebarItemClick(item);
  };

  return (
    <nav className="sidebar d-flex flex-column">
      <div className={`sidebar-item ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => handleItemClick('Home')}>
        <FaHome className="sidebar-icon" />
        <span>Home</span>
      </div>
      <div className={`sidebar-item ${activeItem === 'Roles' ? 'active' : ''}`} onClick={() => handleItemClick('Roles')}>
        <FaCog className="sidebar-icon" />
        <span>Roles</span>
      </div>
      <div className={`sidebar-item ${activeItem === 'Users' ? 'active' : ''}`} onClick={() => handleItemClick('Users')}>
        <FaUsers className="sidebar-icon" />
        <span>Users</span>
      </div>
    </nav>
  );
};

export default Sidebar;
