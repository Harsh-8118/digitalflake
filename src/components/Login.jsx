 
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../asset/digi-logo.png';

const Login = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     
    const dummyEmail = 'admin@example.com';
    const dummyPassword = 'password123';

    if (email === dummyEmail && password === dummyPassword) {
       
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center mb-4">
          <img src={logo} alt="Digitalflake Logo" />
        </div>
        <h3 className="text-center mb-4">Welcome to Digitalflake admin</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email-id</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </Form.Group>
          <div className="text-end mt-2 mb-3">
            <a href="#" onClick={onForgotPassword} className="text-decoration-none">Forgot Password?</a>
          </div>
          <Button variant="primary" type="submit" className="w-100">Log In</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
