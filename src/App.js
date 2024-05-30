// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import AdminPanel from './components/adminpanel';

function App() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={showForgotPassword ? (
              <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
            ) : (
              <Login onForgotPassword={() => setShowForgotPassword(true)} />
            )} 
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
