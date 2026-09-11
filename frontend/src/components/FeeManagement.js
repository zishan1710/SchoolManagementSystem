import React, { useState, useEffect } from 'react';
import { feeRecordAPI, classAPI, studentAPI } from '../services/api';
import '../styles/Management.css';

const FeeManagement = () => {
  const [feeRecords, setFeeRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    studentId: '',
    feeMonth: new Date().toISOString().slice(0, 7)
  });

  useEffect(() => {
    fetchFeeRecords();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchFeeRecords = async () => {
    try {
      setLoading(true);
      const response = await feeRecordAPI.getAllFeeRecords();
      setFeeRecords(response.data);
    } catch (error) {
      console.error('Error fetching fee records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAllClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleApplyFilters = async () => {
    try {
      setLoading(true);
      let records = [];
      
      if (filterClass && filterMonth) {
        const response = await feeRecordAPI.getFeeRecordsByClassAndMonth(filterClass, filterMonth);
        records = response.data;
      } else if (filterMonth) {
        const response = await feeRecordAPI.getFeeRecordsByMonth(filterMonth);
        records = response.data;
      } else if (filterClass) {
        const response = await feeRecordAPI.getAllFeeRecords();
        records = response.data.filter(r => r.classId.toString() === filterClass);
      } else {
        const response = await feeRecordAPI.getAllFeeRecords();
        records = response.data;
      }
      
      if (filterStatus) {
        records = records.filter(r => r.paymentStatus === filterStatus);
      }
      
      setFeeRecords(records);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFeeRecord = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await feeRecordAPI.createFeeRecord(
        createFormData.studentId,
        createFormData.feeMonth,
        user.id
      );
      setShowCreateForm(false);
      setCreateFormData({
        studentId: '',
        feeMonth: new Date().toISOString().slice(0, 7)
      });
      fetchFeeRecords();
    } catch (error) {
      console.error('Error creating fee record:', error);
      alert(error.response?.data?.message || 'Error creating fee record');
    }
  };

  const handleMarkAsPaid = async (recordId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await feeRecordAPI.markAsPaid(recordId, user.id);
      fetchFeeRecords();
    } catch (error) {
      console.error('Error marking as paid:', error);
      alert('Error marking fee as paid');
    }
  };

  const handleMarkAsUnpaid = async (recordId) => {
    try {
      await feeRecordAPI.markAsUnpaid(recordId);
      fetchFeeRecords();
    } catch (error) {
      console.error('Error marking as unpaid:', error);
      alert('Error marking fee as unpaid');
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Fee Management</h2>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn-primary">
          {showCreateForm ? 'Cancel' : '+ Create Fee Record'}
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateFeeRecord} className="management-form">
          <div className="form-group">
            <label>Student *</label>
            <select
              value={createFormData.studentId}
              onChange={(e) => setCreateFormData({ ...createFormData, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.studentId})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fee Month *</label>
            <input
              type="month"
              value={createFormData.feeMonth}
              onChange={(e) => setCreateFormData({ ...createFormData, feeMonth: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-success">Create Fee Record</button>
        </form>
      )}

      <div className="filter-section">
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
          <option value="">All Classes</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.className}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>
        <button onClick={handleApplyFilters} className="btn-secondary">Apply Filters</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Type</th>
                <th>Month</th>
                <th>Fee Amount</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.studentName}</td>
                  <td>{record.studentId}</td>
                  <td>{record.classNumber}</td>
                  <td>{record.studentType}</td>
                  <td>{record.feeMonth}</td>
                  <td>₹{record.feeAmount}</td>
                  <td>
                    <span className={`status-badge ${record.paymentStatus === 'PAID' ? 'paid' : 'unpaid'}`}>
                      {record.paymentStatus}
                    </span>
                  </td>
                  <td>{record.paymentDate || '-'}</td>
                  <td>
                    {record.paymentStatus === 'UNPAID' ? (
                      <button onClick={() => handleMarkAsPaid(record.id)} className="btn-success">Mark Paid</button>
                    ) : (
                      <button onClick={() => handleMarkAsUnpaid(record.id)} className="btn-warning">Mark Unpaid</button>
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

export default FeeManagement;
