const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// Schema + Model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// GET all students
app.get('/students', async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// POST new student
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// PUT update student
app.put('/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // return updated document
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

// DELETE student
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
