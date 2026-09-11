import React, { useState, useEffect } from 'react';
import { reportAPI } from '../services/api';
import '../styles/Management.css';

const MonthlyReport = () => {
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7));
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [classWiseReport, setClassWiseReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showClassWise, setShowClassWise] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const monthlyRes = await reportAPI.getMonthlyReport(reportMonth);
      setMonthlyReport(monthlyRes.data);
      
      const classWiseRes = await reportAPI.getClassWiseMonthlyReport(reportMonth);
      setClassWiseReport(classWiseRes.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setReportMonth(e.target.value);
  };

  useEffect(() => {
    if (reportMonth) {
      fetchReports();
    }
  }, [reportMonth]);

  if (loading) {
    return <div>Loading report...</div>;
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Monthly Fee Report</h2>
        <input
          type="month"
          value={reportMonth}
          onChange={handleMonthChange}
          style={{ padding: '8px 12px', fontSize: '14px' }}
        />
      </div>

      {monthlyReport && (
        <div className="report-container">
          <div className="report-summary">
            <h3>Summary for {reportMonth}</h3>
            <div className="report-stats">
              <div className="report-stat">
                <span>Total Students:</span>
                <strong>{monthlyReport.totalStudents}</strong>
              </div>
              <div className="report-stat">
                <span>Total Expected Fees:</span>
                <strong>₹{monthlyReport.totalExpectedFees}</strong>
              </div>
              <div className="report-stat">
                <span>Collected Fees:</span>
                <strong className="success">₹{monthlyReport.collectedFees}</strong>
              </div>
              <div className="report-stat">
                <span>Pending Fees:</span>
                <strong className="warning">₹{monthlyReport.pendingFees}</strong>
              </div>
              <div className="report-stat">
                <span>Paid Students:</span>
                <strong>{monthlyReport.paidStudents}</strong>
              </div>
              <div className="report-stat">
                <span>Unpaid Students:</span>
                <strong>{monthlyReport.unpaidStudents}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowClassWise(!showClassWise)}
            className="btn-secondary"
            style={{ marginTop: '20px' }}
          >
            {showClassWise ? 'Hide' : 'Show'} Class-wise Summary
          </button>

          {showClassWise && classWiseReport && (
            <div className="class-wise-report">
              <h3>Class-wise Summary</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Total Students</th>
                      <th>Paid Students</th>
                      <th>Unpaid Students</th>
                      <th>Expected Fees</th>
                      <th>Collected Fees</th>
                      <th>Pending Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(classWiseReport.classWiseData || {}).map(([classNum, data]) => (
                      <tr key={classNum}>
                        <td>{data.className}</td>
                        <td>{data.totalStudents}</td>
                        <td>{data.paidStudents}</td>
                        <td>{data.unpaidStudents}</td>
                        <td>₹{data.expectedFees}</td>
                        <td className="success">₹{data.collectedFees}</td>
                        <td className="warning">₹{data.pendingFees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;
