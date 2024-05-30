 
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Roles from './Roles';
import Users from './Users';
import './adminpanel.css';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Home'); 

  const handleSidebarItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="admin-panel d-flex flex-column">
      <Header />
      <div className="admin-body d-flex">
        <Sidebar onSidebarItemClick={handleSidebarItemClick} />
          {activeComponent === 'Home' && <MainContent />}
          {activeComponent === 'Roles' && <Roles />}
          {activeComponent === 'Users' && <Users />}
      </div>
    </div>
  );
};

export default AdminPanel;
