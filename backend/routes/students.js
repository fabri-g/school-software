const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// GET all students
router.get('/', studentsController.getAllStudents);

// GET a single student by ID
router.get('/:id', studentsController.getStudentById);

// POST a new student
router.post('/',
  // Validation rules
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('gender').isString().withMessage('Gender must be a string'),
  // ... validate other fields as necessary ...
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    studentsController.createStudent(req, res);
  }
);

// PUT (update) a student by ID
router.put('/:id', studentsController.updateStudentById);

// DELETE a student by ID
router.delete('/:id', studentsController.deleteStudentById);

module.exports = router;
