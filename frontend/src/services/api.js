import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add authorization token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
};

// Student APIs
export const studentAPI = {
    getAllStudents: () => api.get('/students'),
    getStudentById: (id) => api.get(`/students/${id}`),
    getStudentsByClass: (classId) => api.get(`/students/class/${classId}`),
    searchStudents: (term) => api.get('/students/search', { params: { term } }),
    addStudent: (data) => api.post('/students', data),
    updateStudent: (id, data) => api.put(`/students/${id}`, data),
    deleteStudent: (id) => api.delete(`/students/${id}`),
};

// User/Finance APIs
export const userAPI = {
    addFinanceUser: (data) => api.post('/users/finance', data),
    getAllFinanceUsers: () => api.get('/users/finance/all'),
    getActiveFinanceUsers: () => api.get('/users/finance/active'),
    getUserById: (id) => api.get(`/users/${id}`),
    updateFinanceUser: (id, data) => api.put(`/users/${id}`, data),
    deactivateFinanceUser: (id) => api.put(`/users/${id}/deactivate`),
};

// Class APIs
export const classAPI = {
    getAllClasses: () => api.get('/classes'),
    getClassById: (id) => api.get(`/classes/${id}`),
};

// Fee Record APIs
export const feeRecordAPI = {
    createFeeRecord: (studentId, feeMonth, userId) =>
        api.post('/fee-records/create', null, { params: { studentId, feeMonth, userId } }),
    getAllFeeRecords: () => api.get('/fee-records'),
    getFeeRecordById: (id) => api.get(`/fee-records/${id}`),
    getFeeRecordsByStudent: (studentId) => api.get(`/fee-records/student/${studentId}`),
    getFeeRecordsByMonth: (feeMonth) => api.get(`/fee-records/month/${feeMonth}`),
    getFeeRecordsByStatus: (status) => api.get(`/fee-records/status/${status}`),
    getFeeRecordsByClassAndMonth: (classId, feeMonth) =>
        api.get(`/fee-records/class/${classId}/month/${feeMonth}`),
    markAsPaid: (id, userId) => api.put(`/fee-records/${id}/mark-paid`, null, { params: { userId } }),
    markAsUnpaid: (id) => api.put(`/fee-records/${id}/mark-unpaid`),
};

// Dashboard APIs
export const dashboardAPI = {
    getAdminDashboard: () => api.get('/dashboard/admin'),
    getFinanceDashboard: () => api.get('/dashboard/finance'),
};

// Report APIs
export const reportAPI = {
    getMonthlyReport: (month) => api.get('/reports/monthly', { params: { month } }),
    getClassWiseMonthlyReport: (month) => api.get('/reports/class-wise-monthly', { params: { month } }),
};

export default api;
