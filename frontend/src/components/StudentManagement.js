import React, { useState, useEffect } from 'react';
import { studentAPI, classAPI } from '../services/api';
import '../styles/Management.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    parentName: '',
    contactNumber: '',
    classId: '',
    studentType: 'DAY_SCHOLAR'
  });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await studentAPI.getAllStudents();

      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAllClasses();

      console.log('Classes received:', response.data);

      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleSearchAndFilter = async () => {
    try {
      if (searchTerm) {
        const response = await studentAPI.searchStudents(searchTerm);

        let filtered = response.data;

        if (filterClass) {
          filtered = filtered.filter(
            (s) => s.classId?.toString() === filterClass
          );
        }

        setStudents(filtered);
      } else if (filterClass) {
        const response = await studentAPI.getStudentsByClass(filterClass);

        setStudents(response.data);
      } else {
        fetchStudents();
      }
    } catch (error) {
      console.error('Error searching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.classId) {
        alert('Please select a class');
        return;
      }

      if (editingId) {
        await studentAPI.updateStudent(editingId, formData);
      } else {
        await studentAPI.addStudent(formData);
      }

      setShowForm(false);
      setEditingId(null);

      setFormData({
        name: '',
        studentId: '',
        parentName: '',
        contactNumber: '',
        classId: '',
        studentType: 'DAY_SCHOLAR'
      });

      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);

      alert(
        error.response?.data?.message ||
        'Error saving student'
      );
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name || '',
      studentId: student.studentId || '',
      parentName: student.parentName || '',
      contactNumber: student.contactNumber || '',
      classId: student.classId
        ? student.classId.toString()
        : '',
      studentType: student.studentType || 'DAY_SCHOLAR'
    });

    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this student?'
      )
    ) {
      try {
        await studentAPI.deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      !filterClass ||
      student.classId?.toString() === filterClass
  );

  return (
    <div className="management-container">

      {/* Header */}
      <div className="management-header">
        <h2>Student Management</h2>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);

            if (!showForm) {
              setFormData({
                name: '',
                studentId: '',
                parentName: '',
                contactNumber: '',
                classId: '',
                studentType: 'DAY_SCHOLAR'
              });
            }
          }}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Student'}
        </button>
      </div>

      {/* Add / Edit Student Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="management-form"
        >

          {/* Student Name */}
          <div className="form-group">
            <label>Student Name *</label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              required
            />
          </div>

          {/* Student ID */}
          <div className="form-group">
            <label>Student ID *</label>

            <input
              type="text"
              value={formData.studentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  studentId: e.target.value
                })
              }
              required
              disabled={editingId}
            />
          </div>

          {/* Parent Name */}
          <div className="form-group">
            <label>Parent Name *</label>

            <input
              type="text"
              value={formData.parentName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  parentName: e.target.value
                })
              }
              required
            />
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label>Contact Number *</label>

            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactNumber: e.target.value
                })
              }
              required
            />
          </div>

          {/* CLASS DROPDOWN */}
          <div className="form-group">
            <label>Class *</label>

            <select
              name="classId"
              value={formData.classId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  classId: e.target.value
                })
              }
              required
            >
              <option value="">
                Select Class
              </option>

              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <option
                    key={classItem.id}
                    value={classItem.id}
                  >
                    {classItem.className}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No classes available
                </option>
              )}
            </select>
          </div>

          {/* Student Type */}
          <div className="form-group">
            <label>Student Type *</label>

            <select
              value={formData.studentType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  studentType: e.target.value
                })
              }
              required
            >
              <option value="DAY_SCHOLAR">
                Day Scholar
              </option>

              <option value="HOSTLER">
                Hostler
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-success"
          >
            {editingId ? 'Update' : 'Add'} Student
          </button>

        </form>
      )}

      {/* Search / Filter */}
      <div className="filter-section">

        <input
          type="text"
          placeholder="Search by name or student ID"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={filterClass}
          onChange={(e) =>
            setFilterClass(e.target.value)
          }
        >
          <option value="">
            All Classes
          </option>

          {classes.map((classItem) => (
            <option
              key={classItem.id}
              value={classItem.id}
            >
              {classItem.className}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearchAndFilter}
          className="btn-secondary"
        >
          Search
        </button>

      </div>

      {/* Student Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Parent</th>
                <th>Contact</th>
                <th>Class</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.studentId}
                    </td>

                    <td>
                      {student.parentName}
                    </td>

                    <td>
                      {student.contactNumber}
                    </td>

                    <td>
                      {student.className}
                    </td>

                    <td>
                      {student.studentType}
                    </td>

                    <td>

                      <button
                        onClick={() =>
                          handleEdit(student)
                        }
                        className="btn-edit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(student.id)
                        }
                        className="btn-delete"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: 'center' }}
                  >
                    No students found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default StudentManagement;