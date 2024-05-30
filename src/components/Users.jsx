import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { MdPerson } from 'react-icons/md';
import './Users.css';  
import Delete from './Delete';  
import AddUser from './AddUser';  

const Users = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteClick = (user) => {
    setShowDeleteDialog(true);
    setUserToDelete(user);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete && userToDelete._id) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userToDelete._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        setUsers(users.filter(u => u._id !== userToDelete._id));
        setShowDeleteDialog(false);
        setUserToDelete(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('User ID is missing');
    }
  };

  const handleAddNewClick = () => {
    setAddingUser(true);
    setEditingUser(null);
  };

  const handleCancelAdd = () => {
    setAddingUser(false);  
    setEditingUser(null);  
  };

  const handleEditClick = (user) => {
    console.log('Editing user:', user); // Debugging statement
    setEditingUser(user);
    setAddingUser(true);
  };

  const handleSaveUser = async (newUser) => {
    try {
      let response;
      if (editingUser && editingUser._id) {
        console.log('Saving user with ID:', editingUser._id); // Debugging statement
        response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
      } else {
        console.log('Adding new user'); // Debugging statement
        response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      const savedUser = await response.json();

      if (editingUser) {
        const updatedUsers = users.map(u => (u._id === savedUser._id ? savedUser : u));
        setUsers(updatedUsers);
      } else {
        setUsers([...users, savedUser]);
      }
      setAddingUser(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error in handleSaveUser:', error);
    }
  };

  return (
    <div className="container mt-4">
      {addingUser ? (
        <AddUser onSave={handleSaveUser} onCancel={handleCancelAdd} user={editingUser} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <MdPerson size={24} className="me-2" />
              <h2>User</h2>
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
          <table className="table custom-table mt-4">
            <thead className="table-header">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email-Id</th>
                <th scope="col">Role <MdPerson /></th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.role}</td>
                  <td className={user.status === 'Active' ? 'text-success' : 'text-danger'}>
                    {user.status}
                  </td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleEditClick(user)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(user)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Delete
            show={showDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            handleConfirm={handleDeleteConfirm} // Added handleConfirm for delete confirmation
          />
        </>
      )}
    </div>
  );
};

export default Users;
