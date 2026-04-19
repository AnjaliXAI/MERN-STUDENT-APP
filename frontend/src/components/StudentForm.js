import React, { useState } from "react";

function StudentForm({ onRegister }) {
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.course) {
      setError("All fields are required!");
      return;
    }
    if (isNaN(form.age) || form.age <= 0) {
      setError("Age must be a valid positive number!");
      return;
    }
    setError("");
    onRegister(form);
    setForm({ name: "", age: "", course: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <button type="submit" className="add-btn">Add Student</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default StudentForm;
