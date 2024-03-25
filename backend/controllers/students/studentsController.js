const { fetchAllStudents, fetchStudentById, createNewStudent, updateStudentById, deleteStudentById } = require('../../services/studentsService');

// Function to get all students
async function getAllStudents(req, res, next) {
  try {
    const { name } = req.query;
    const students = await fetchAllStudents(name);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    next(error);
  }
};

// Function to get a single student by ID
async function getStudentById(req, res, next) {
  try {
    const id = req.params.id;
    const student = await fetchStudentById(id);
    if (student) {
      res.json(student);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    next(error);
  }
};

// Function to create a new student
async function createStudent(req, res, next) {
  try {
    const studentData = req.body;
    const newStudent = await createNewStudent(studentData);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: error.message });
  }
}

// Function to update a student by ID
async function updateStudent(req, res, next) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedStudent = await updateStudentById(id, updateData);
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    next(error);
  }
}

// Function to delete a student by ID
async function deleteStudent(req, res, next) {
  try {
    const id = req.params.id;
    await deleteStudentById(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error('Error deleting student:', error);
    next(error);
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
