import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import StudentManagement from '../components/StudentManagement';
import FinanceUserManagement from '../components/FinanceUserManagement';
import FeeOverview from '../components/FeeOverview';
import MonthlyReport from '../components/MonthlyReport';
import { dashboardAPI } from '../services/api';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getAdminDashboard();
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
          <i className="fas fa-school"></i>
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <i className="fas fa-users"></i>
            <span>Students</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'finance-users' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance-users')}
          >
            <i className="fas fa-user-tie"></i>
            <span>Finance Users</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <i className="fas fa-money-bill"></i>
            <span>Fee Management</span>
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
          <h1>{activeTab === 'overview' ? 'Admin Dashboard' : 
              activeTab === 'students' ? 'Student Management' :
              activeTab === 'finance-users' ? 'Finance Users' :
              activeTab === 'fees' ? 'Fee Overview' :
              'Monthly Report'}</h1>
          <div className="user-info">
            <span>{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Admin'}</span>
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
                  <i className="fas fa-book"></i>
                  <div className="stat-info">
                    <h3>Total Classes</h3>
                    <p className="stat-value">{dashboardData.totalClasses}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-user-tie"></i>
                  <div className="stat-info">
                    <h3>Finance Users</h3>
                    <p className="stat-value">{dashboardData.financeUsers}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-check-circle"></i>
                  <div className="stat-info">
                    <h3>Paid Students</h3>
                    <p className="stat-value">{dashboardData.paidStudents}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-times-circle"></i>
                  <div className="stat-info">
                    <h3>Unpaid Students</h3>
                    <p className="stat-value">{dashboardData.unpaidStudents}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="fas fa-money-bill"></i>
                  <div className="stat-info">
                    <h3>Total Collected</h3>
                    <p className="stat-value">₹{dashboardData.totalFeesCollected}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'finance-users' && <FinanceUserManagement />}
          {activeTab === 'fees' && <FeeOverview />}
          {activeTab === 'reports' && <MonthlyReport />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
