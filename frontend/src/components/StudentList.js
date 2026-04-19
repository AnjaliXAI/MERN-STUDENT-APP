import React, { useState } from "react";
import axios from "axios";

function StudentList({ students, setStudents, search }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", age: "", course: "" });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://localhost:5000/students/${id}`)
        .then(() => {
          setStudents(prev => prev.filter(s => s._id !== id));
          alert("🗑️ Student deleted successfully!");
        })
        .catch(() => alert("❌ Error deleting student"));
    }
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setEditForm({ name: student.name, age: student.age, course: student.course });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/students/${id}`, editForm)
      .then(res => {
        setStudents(prev => prev.map(s => s._id === id ? res.data : s));
        setEditId(null);
        alert("✏️ Student updated successfully!");
      })
      .catch(() => alert("❌ Error updating student"));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Registered Student List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No students found</td>
            </tr>
          ) : (
            filteredStudents.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{editId === s._id ? <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /> : s.name}</td>
                <td>{editId === s._id ? <input value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} /> : s.age}</td>
                <td>{editId === s._id ? <input value={editForm.course} onChange={(e) => setEditForm({ ...editForm, course: e.target.value })} /> : s.course}</td>
                <td>
                  {editId === s._id ? (
                    <>
                      <button className="add-btn" onClick={() => handleUpdate(s._id)}>Save</button>
                      <button className="delete-btn" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
