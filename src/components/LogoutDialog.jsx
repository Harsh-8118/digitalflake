import React from 'react';
import { Modal } from 'react-bootstrap';
import { BiAlarmExclamation } from 'react-icons/bi';  
import { AiOutlineClose } from 'react-icons/ai';  
import './LogoutDialog.css';

const LogoutDialog = ({ show, handleClose, handleLogout }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <div className="mb-3">
        <span className="title-wrapper">
            <BiAlarmExclamation className="text-danger mx-3" style={{ fontSize: '2rem' }} />
            <h2 className="modal-title">Log Out</h2>
          </span>
        </div>
        <p>Are you sure you want to log out?</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-secondary me-2" onClick={handleClose}>
            <AiOutlineClose /> {/* Close icon */}
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleLogout}>
            Confirm
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutDialog;
