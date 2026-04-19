import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  const addStudent = (form) => {
    axios.post("http://localhost:5000/students", form)
      .then(res => {
        setStudents([...students, res.data]);
        alert("✅ Student added successfully!");
      })
      .catch(() => alert("❌ Error adding student"));
  };

  return (
    <div className="app-container">
      <h1>Student Management</h1>
      <div className="badge">Total Students: {students.length}</div>
      <input
        type="text"
        placeholder="Search by name or course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <StudentForm onRegister={addStudent} />
      <StudentList students={students} setStudents={setStudents} search={search} />
    </div>
  );
}

export default App;
