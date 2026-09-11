import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import '../styles/Management.css';

const FinanceUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchFinanceUsers();
  }, []);

  const fetchFinanceUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllFinanceUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching finance users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userAPI.updateFinanceUser(editingId, formData);
      } else {
        await userAPI.addFinanceUser(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
      fetchFinanceUsers();
    } catch (error) {
      console.error('Error saving finance user:', error);
      alert(error.response?.data?.message || 'Error saving finance user');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDeactivate = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this finance user?')) {
      try {
        await userAPI.deactivateFinanceUser(id);
        fetchFinanceUsers();
      } catch (error) {
        console.error('Error deactivating finance user:', error);
      }
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Finance User Management</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Finance User'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="management-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={editingId}
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-success">
            {editingId ? 'Update' : 'Add'} Finance User
          </button>
        </form>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {user.active && (
                      <>
                        <button onClick={() => handleEdit(user)} className="btn-edit">Edit</button>
                        <button onClick={() => handleDeactivate(user.id)} className="btn-delete">Deactivate</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinanceUserManagement;
