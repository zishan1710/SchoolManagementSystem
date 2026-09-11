import React, { useState, useEffect } from 'react';
import { feeRecordAPI, classAPI } from '../services/api';
import '../styles/Management.css';

const FeeOverview = () => {
  const [feeRecords, setFeeRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchFeeRecords();
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

  const filteredRecords = feeRecords;

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Fee Overview</h2>
      </div>

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
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeeOverview;
