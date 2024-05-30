 
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './ForgotPassword.css';

const ForgotPassword = ({ onBackToLogin }) => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="text-center mb-4">
          <h3>Did you forget password?</h3>
          <p>Enter your email address and we'll send you a link to restore password</p>
        </div>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">Request reset link</Button>
        </Form>
        <div className="text-center mt-3">
          <a href="#" onClick={onBackToLogin} className="text-decoration-none">Back to log in</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
