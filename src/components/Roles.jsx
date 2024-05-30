import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCog } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import Delete from './Delete';   
import EditRole from './EditRole';   
import './Roles.css';
import { FaArrowLeft } from 'react-icons/fa';

 
const AddRole = ({ onSave, onCancel }) => {
  const [roleName, setRoleName] = useState('');

  const handleSave = () => {
     
    onSave({ id: Math.random(), roleName, status: 'Active' });  
    setRoleName('');
  };

  return (
    <div className="add-role-container">
     <div className="edit-role-header d-flex align-items-center">
        <FaArrowLeft onClick={onCancel} className="back-arrow pe-auto" />
        <h3 className="edit-role-title mx-3">Add Role</h3>
      </div>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-4" 
          value={roleName} 
          onChange={(e) => setRoleName(e.target.value)} 
          placeholder="Role Name" 
        />
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

const Roles = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingRole, setEditingRole] = useState(null);  
  const [addingRole, setAddingRole] = useState(false);  

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleEditClick = (role) => {
    setEditingRole(role);   
  };

  const handleCancelEdit = () => {
    setEditingRole(null);   
  };

  const handleAddNewClick = () => {
    setAddingRole(true);
  };

  const handleCancelAdd = () => {
    setAddingRole(false);
  };

  const handleSaveRole = (newRole) => {
     
    roles.push(newRole);   
    setAddingRole(false);
  };

  const roles = [
    { id: 123, roleName: 'Admin', status: 'Active' },
    { id: 124, roleName: 'Superadmin', status: 'Inactive' },
    { id: 125, roleName: 'Caller', status: 'Inactive' },
    { id: 126, roleName: 'Account', status: 'Active' },
  ];

  return (
    <div className="container mt-4">
      {editingRole ? (
        <EditRole role={editingRole} onCancel={handleCancelEdit} />
      ) : addingRole ? (
        <AddRole onSave={handleSaveRole} onCancel={handleCancelAdd} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <FaCog size={24} className="me-2" />
              <h2>Role</h2>
            </div>
            <div className="input-group w-50">
              <input type="text" className="form-control" placeholder="Search" />
              <div className="input-group-append">
                <span className="input-group-text">
                  <BiSearch />
                </span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleAddNewClick}>Add New</button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead className="bg-yellow">
                <tr className="bg-yellow">
                  <th scope="col">Id</th>
                  <th scope="col">Role Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.roleName}</td>
                    <td className={role.status === 'Active' ? 'text-success' : 'text-danger'}>
                      {role.status}
                    </td>
                    <td>
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleEditClick(role)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteClick}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Delete show={showDeleteDialog} handleClose={handleCloseDeleteDialog} />
        </>
      )}
    </div>
  );
};

export default Roles;
