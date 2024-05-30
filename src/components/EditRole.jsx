import React, { useState } from 'react';
import './EditRole.css';
import { FaArrowLeft } from 'react-icons/fa';

const EditRole = ({ role, onCancel }) => {
  const [roleName, setRoleName] = useState(role.roleName);
  const [status, setStatus] = useState(role.status);

  const handleSave = () => {
     
    onCancel();  
  };

  return (
    <div className="edit-role-container">
      <div className="edit-role-header d-flex align-items-center">
        <FaArrowLeft onClick={onCancel} className="back-arrow pe-auto" />
        <h3 className="edit-role-title mx-3">Edit Role</h3>
      </div>
      <div className='d-flex flex-column'>
      <form className="edit-role-form">
      <div className='d-flex justify-content-around'>
        <div className="form-group form-group-inline">
          <label htmlFor="roleName" className="form-label">Role Name</label>
          <input
            type="text"
            id="roleName"
            className="form-control"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            style={{width: "300px"}}
          />
        </div>
        <div className="form-group form-group-inline">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{width: "300px"}}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditRole;
