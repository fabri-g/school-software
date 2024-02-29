const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const { StudentValidations } = require('../validations/studentValidations');

// GET all students
router.get('/', studentsController.getAllStudents);

// GET a single student by ID
router.get('/:id', studentsController.getStudentById);

// POST route for creating a new student
router.post('/', StudentValidations ,(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  studentsController.createStudent(req, res, next);
});

// PUT route for uptdating a student by ID
router.put('/:id', StudentValidations , (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  studentsController.updateStudentById(req, res, next);
});

// DELETE a student by ID
router.delete('/:id', studentsController.deleteStudentById);

module.exports = router;
