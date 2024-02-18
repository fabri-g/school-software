const { Student, Room } = require('../models');

// Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{model: Room, as: 'room'}]
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id, {
      include: [{model: Room, as: 'room'}]
  });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, gender, address, roomID } = req.body;
    const newStudent = await Student.create({ name, age, gender, address, roomID });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a student by ID
exports.updateStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const [updated] = await Student.update(updateData, { where: { id } });

    if (updated) {
      const updatedStudent = await Student.findByPk(id);
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a student by ID
exports.deleteStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Student.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
