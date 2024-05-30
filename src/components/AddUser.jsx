import React, { useState, useEffect } from 'react';
import './AddUser.css';  

const AddUser = ({ onCancel, onSave, user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [mobile, setMobile] = useState(user ? user.mobile : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : '');
  const [image, setImage] = useState(user ? user.image : null);
  const [status, setStatus] = useState(user ? user.status : 'Active');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      setEmail(user.email);
      setRole(user.role);
      setImage(user.image);
      setStatus(user.status);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };  

  const handleSave = async () => {
    const userData = { name, mobile, email, role, image, status };
    try {
      const response = await fetch(user ? `http://localhost:5000/api/users/${user.id}` : 'http://localhost:5000/api/users', {
        method: user ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(user ? 'User updated successfully' : 'User added successfully');
        onSave(data);
      } else {
        setMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="add-user-container">
      {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <div className='d-flex align-items-center'>
        <button className="back-button mx-2" onClick={onCancel}>←</button>
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
      </div>
      <div className="form-group">
        <div className='d-flex justify-content-between gap-5 p-4'>
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" className="form-control" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input type="email" className="form-control" placeholder="Email-id" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='d-flex justify-content-between gap-5 p-4'>
          <div className="dropdown">
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} style={{width:"295px"}}>
              <option value="">Role</option>
              <option value="Admin">Admin</option>
              <option value="Superadmin">Superadmin</option>
              <option value="Caller">Caller</option>
              <option value="Account">Account</option>
            </select>
          </div>
          {user && (
            <div className="dropdown">
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} style={{width:"295px"}}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}
          <div className="upload-image">
            <label>Upload Image</label>
            <input type="file" onChange={handleImageChange} style={{width:"295px"}}/>
            {image && <img src={image} alt="Profile Preview" />}
            <p>Upload Maximum allowed file size is 10MB</p>
          </div>
        </div>
      </div>
      <div className="form-actions d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={onCancel} style={{width:"200px"}}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} style={{width:"200px"}}>Save</button>
      </div>
    </div>
  );
};

export default AddUser;
