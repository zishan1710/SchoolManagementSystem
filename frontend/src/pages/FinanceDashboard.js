import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import FeeManagement from '../components/FeeManagement';
import MonthlyReport from '../components/MonthlyReport';
import { dashboardAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const FinanceDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getFinanceDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-money-bill"></i>
          <h2>Finance Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-pie"></i>
            <span>Dashboard</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <i className="fas fa-money-bill"></i>
            <span>Manage Fees</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fas fa-file-alt"></i>
            <span>Reports</span>
          </button>
          <button className="menu-item logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <h1>{activeTab === 'overview' ? 'Finance Dashboard' : 
              activeTab === 'fees' ? 'Fee Management' :
              'Monthly Report'}</h1>
          <div className="user-info">
            <span>{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Finance'}</span>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'overview' && dashboardData && (
            <div className="dashboard-overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-graduation-cap"></i>
                  <div className="stat-info">
                    <h3>Total Students</h3>
                    <p className="stat-value">{dashboardData.totalStudents}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-calculator"></i>
                  <div className="stat-info">
                    <h3>Expected Fees</h3>
                    <p className="stat-value">₹{dashboardData.expectedFees}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-check-circle"></i>
                  <div className="stat-info">
                    <h3>Collected Fees</h3>
                    <p className="stat-value">₹{dashboardData.collectedFees}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-hourglass"></i>
                  <div className="stat-info">
                    <h3>Pending Fees</h3>
                    <p className="stat-value">₹{dashboardData.pendingFees}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-check"></i>
                  <div className="stat-info">
                    <h3>Paid Students</h3>
                    <p className="stat-value">{dashboardData.paidStudents}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-times"></i>
                  <div className="stat-info">
                    <h3>Unpaid Students</h3>
                    <p className="stat-value">{dashboardData.unpaidStudents}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && <FeeManagement />}
          {activeTab === 'reports' && <MonthlyReport />}
        </div>
      </main>
    </div>
  );
};

export default FinanceDashboard;
